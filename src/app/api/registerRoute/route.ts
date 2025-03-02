import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { SendEmail } from "@/lib/mail";
import fs from "fs";
import path from "path";
import { randomInt } from "crypto";
import Handlebars from "handlebars";
import { zxcvbnAsync } from "@zxcvbn-ts/core";
import { zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import validator from "validator";

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);
const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  useLevenshteinDistance: true,
  translations: zxcvbnEnPackage.translations,
};
zxcvbnOptions.setOptions(options);

export async function POST(req: NextRequest) {
  const secretKey = process.env.JWT_SECRET || "";
  const refreshKey = process.env.JWT_REFRESH_SECRET || "";
  const smtpEmail = process.env.SMTP_EMAIL;

  if (!secretKey || !refreshKey || !smtpEmail) {
    return new NextResponse(
      JSON.stringify({ error: { message: "Required environment variables are missing!" } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { username, email, password, role } = await req.json();

    // Validate Email Format
    if (!validator.isEmail(email)) {
      return new NextResponse(
        JSON.stringify({ error: { message: "Invalid email format!" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Trim and sanitize input
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedUsername = username.trim().toLowerCase();

    // Validate fields
    if (!sanitizedUsername || !sanitizedEmail || !password) {
      return new NextResponse(
        JSON.stringify({ error: { message: "All fields are required!" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Password strength check
    const passwordStrength = await zxcvbnAsync(password);
    const passwordScore = passwordStrength.score;
    let passwordMessage = "";

    if (passwordScore === 0) {
      passwordMessage = "Password is too guessable: risky password.";
    } else if (passwordScore === 1) {
      passwordMessage = "Password is very guessable: protection from throttled online attacks.";
    } else if (passwordScore === 2) {
      passwordMessage = "Password is somewhat guessable: protection from unthrottled online attacks.";
    } else if (passwordScore === 3) {
      passwordMessage = "Password is safely unguessable: moderate protection from offline slow-hash scenarios.";
    } else if (passwordScore === 4) {
      passwordMessage = "Password is very strong: great protection from offline slow-hash scenarios.";
    }

    // For weak passwords (score 0, 1, or 2), show message and don't proceed with registration
    if (passwordScore < 3) {
      return new NextResponse(
        JSON.stringify({ error: { message: passwordMessage } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user already exists (case-insensitive check for email and username)
    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      prisma.user.findUnique({ where: { email: sanitizedEmail } }),
      prisma.user.findUnique({ where: { username: sanitizedUsername } }),
    ]);

    if (existingUserByEmail) {
      return new NextResponse(
        JSON.stringify({ error: { message: "User already exists with this email!" } }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    if (existingUserByUsername) {
      return new NextResponse(
        JSON.stringify({ error: { message: "Username already exists!" } }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash the password and create the user
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const verificationCode = randomInt(100000, 1000000);
    const newUser = await prisma.user.create({
      data: {
        username: sanitizedUsername,
        password: hash,
        email: sanitizedEmail,
        role,
        isVerified: false,
        verificationCode: verificationCode.toString(),
      },
    });

    // Create JWT tokens (refactor to avoid duplication)
    const tokenPayload = {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        isVerified: newUser.isVerified,
      },
    };

    const accessToken = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
    const refreshToken = jwt.sign(tokenPayload, refreshKey, { expiresIn: "7d" });

    // Set cookies
    const cookieStore = await cookies();
    cookieStore.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 1 * 60 * 60,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    // Send email with verification code
    const filePath = path.join(process.cwd(), "public", "component", "email", "index.html");
    const htmlTemplate = fs.readFileSync(filePath, "utf-8");
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template({
      username: sanitizedUsername,
      verificationCode: verificationCode.toString(),
    });

    await SendEmail({
      to: sanitizedEmail,
      from: smtpEmail,
      subject: "Welcome to Our Service",
      text: `Your verification code is: ${verificationCode}`,
      html: htmlContent,
    });

    return new NextResponse(
      JSON.stringify({
        message: `Account successfully created! Please verify your email. Password strength: ${passwordMessage}`,
        user: { username: sanitizedUsername, email: sanitizedEmail },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Registration Error:", err.stack || error);
    return new NextResponse(
      JSON.stringify({ error: { message: "Internal error: " + err.message } }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
