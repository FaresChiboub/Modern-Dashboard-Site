// File: app/api/logout/route.ts or pages/api/logout.ts

import { deleteCookie } from "cookies-next"; // Correctly import cookies-next
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logout Successful" });

  deleteCookie("token", { req, res });
  deleteCookie("refreshToken", { req, res });
  return res;
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({ error: { message: "Method not allowed!" } }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
