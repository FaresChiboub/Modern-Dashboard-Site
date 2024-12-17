import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from "jose";

interface UserPayload {
  user: {
    username: string;
    email: string;
    image: string | null;
  };
}

export async function GET() {
  const secretKey = process.env.JWT_SECRET;
  // Check if the JWT_SECRET is missing in environment variables
  if (!secretKey) {
    return new NextResponse(
      JSON.stringify({
        error: { message: "Server configuration error: Missing JWT_SECRET" },
      }),
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token from cookie:", token);

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: { message: "No token found" } }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const secret = new TextEncoder().encode(secretKey);
    // Verify the token and extract the payload
    const verifiedToken = await jose.jwtVerify(token, secret);

    const payload = verifiedToken.payload as unknown;
    if ((payload as UserPayload).user) {
      const userPayload = payload as UserPayload;

      // Access user data correctly and provide defaults where necessary
      const username = userPayload?.user?.username || "Guest";
      const image = userPayload?.user?.image || "/user.png";
      const email = userPayload?.user?.email || "user@email.com";

      return new NextResponse(
        JSON.stringify({
          username,
          email,
          image,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          error: { message: "Invalid token payload structure" },
        }),
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("JWT verification failed:", error);

    let errorMessage = "Invalid or expired token";
    if (error instanceof jose.errors.JWTExpired) {
      errorMessage = "Token has expired";
    } else if (error instanceof jose.errors.JWTClaimValidationFailed) {
      errorMessage = "Token claim validation failed";
    }

    return new NextResponse(
      JSON.stringify({ error: { message: errorMessage } }),
      { status: 403 }
    );
  }
}
