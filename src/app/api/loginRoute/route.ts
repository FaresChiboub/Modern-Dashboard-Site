import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const secretKey = process.env.JWT_SECRET || "";
  const refreshKey = process.env.JWT_REFRESH_SECRET || "";
  if (!secretKey) {
    throw new Error(
      "JWT_SECRET or JWT_REFRESH_SECRET is not defined in environment variables."
    );
  }

  try {
    // Extract the user's id and password from the request body
    const { email, password } = await req.json();

    // Find the user in the database using the id provided
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({ error: { message: "User not found!" } }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!existingUser.password) {
      return new NextResponse(
        JSON.stringify({ error: { message: "failed to retrieve password !" } }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Compare the provided password with the stored hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return new NextResponse(
        JSON.stringify({ error: { message: "password don't match !" } }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Exclude password from the user object to return only user details
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = {
      ...existingUser,
      isVerified: existingUser.isVerified,
    };

    const accessToken = jwt.sign({ user: userWithoutPassword }, secretKey, {
      expiresIn: "19h",
    });

    const refreshToken = jwt.sign({ user: userWithoutPassword }, refreshKey, {
      expiresIn: "7d", // 7 days for refresh token
    });
    // Store the tokens in cookies (with secure options for production environment)
    const cookieStore = await cookies();
    cookieStore.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      path: "/",
      maxAge: 19 * 60 * 60, // Access token expires in 19 hours
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      path: "/",
      maxAge: 7 * 24 * 60 * 60, // Refresh token expires in 7 days
    });

    // Return a success response with the user data (excluding password)
    return new NextResponse(
      JSON.stringify({
        message: "Login Successful!",
        userWithoutPassword,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Registration Error:", err.stack || error);
    return new NextResponse(
      JSON.stringify({
        error: { message: "Internal error: " + err.message },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}