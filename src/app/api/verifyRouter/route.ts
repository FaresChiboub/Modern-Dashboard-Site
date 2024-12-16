import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken"; // Import JWT for token handling
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const secretKey = process.env.JWT_SECRET || "";
  try {
    const { verificationCode } = await req.json();
    if (!verificationCode) {
      return new NextResponse(
        JSON.stringify({ error: "Verification code is required." }),
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: { verificationCode },
    });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found." }), {
        status: 400,
      });
    }
    if (user.verificationCode !== verificationCode) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid verification code." }),
        { status: 400 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date(),
        verificationCode: null,
      },
    });
    // Generate a new token with the updated isVerified value
    const payload = {
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
        username: updatedUser.username,
        image: updatedUser.image,
        isVerified: updatedUser.isVerified,
      },
    };
    // Sign a new token with the updated payload
    const newToken = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    const isProduction = process.env.NODE_ENV === "production";
    // Set the new token in the cookies
    
    const cookieStore = await cookies();
    
    cookieStore.set("token", newToken, {
      path: "/",
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return new NextResponse(
      JSON.stringify({
        message: "Account verified successfully.",
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          username: updatedUser.username,
          isVerified: updatedUser.isVerified,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500 }
    );
  }
}
