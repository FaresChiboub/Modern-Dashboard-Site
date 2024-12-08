import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { getToken } from "next-auth/jwt";

// Define the expected JWT payload structure
interface UserPayload {
  user: {
    id: string;
    role: string;
    username: string;
    image: string;
    isVerified: boolean;
  };
}

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (session) {
    if (pathname.startsWith("/register") || pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // If no token exists and trying to access restricted paths, redirect to login
  else if (!token && !refreshToken && !session) {
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Secret key to decode the token (JWT_SECRET from environment)
  const secretKey = process.env.JWT_SECRET || "";
  const secret = new TextEncoder().encode(secretKey);

  // Blog URL limit logic (only blog numbers <= 10)
  const BlogUrlPart = pathname.split("/");
  if (BlogUrlPart[1] === "blog" && BlogUrlPart[2]) {
    const blogNum = Number(BlogUrlPart[2]);
    if (isNaN(blogNum) || blogNum > 10) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // If there is a token, validate it
  if (token) {
    try {
      const { payload } = (await jose.jwtVerify(token, secret)) as unknown as {
        payload: UserPayload;
      };
      const user = payload.user;
      const isVerified = user.isVerified;
      // Redirect if the user is not verified and trying to access protected pages
      if (isVerified === false && !pathname.startsWith("/verify")) {
        return NextResponse.redirect(new URL("/verify", req.url));
      }
      // Redirect if the user is verified and trying to access the /verify page
      if (isVerified === true && pathname.startsWith("/verify")) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Role-based access control
      const userRole = user.role;
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/editor") ||
        pathname.startsWith("/moderator")
      ) {
        if (
          (userRole === "ADMIN" && pathname.startsWith("/admin")) ||
          (userRole === "EDITOR" && pathname.startsWith("/editor")) ||
          (userRole === "MODERATOR" && pathname.startsWith("/moderator"))
        ) {
          return NextResponse.next();
        }
        // Unauthorized role or path, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // If user is logged in and trying to access register/login, redirect to home
      if (pathname.startsWith("/register") || pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      // Allow access if all checks pass
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification error:", error);

      // Handle JWT errors
      if (error instanceof jose.errors.JWTInvalid) {
        return NextResponse.redirect(
          new URL("/login?error=invalidToken", req.url)
        );
      }
      if (error instanceof jose.errors.JWTExpired) {
        return NextResponse.redirect(
          new URL("/login?error=tokenExpired", req.url)
        );
      }
      if (error instanceof jose.errors.JWSSignatureVerificationFailed) {
        return NextResponse.redirect(
          new URL("/login?error=verificationError", req.url)
        );
      }
      return NextResponse.redirect(
        new URL("/login?error=unknownError", req.url)
      );
    }
  }

  // Default behavior for other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blog/:path*",
    "/admin/:path*",
    "/moderator/:path*",
    "/editor/:path*",
    "/register",
    "/login",
    "/",
    "/dashboard/:path*",
    "/verify",
  ],
};
