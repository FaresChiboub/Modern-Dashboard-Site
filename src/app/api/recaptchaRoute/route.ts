import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const recaptchaSecretKey = process.env.GOOGLE_RECAPTCHA_SECRET;
  if (!recaptchaSecretKey) {
    return new NextResponse(
      JSON.stringify({
        error: { message: "Missing Google reCAPTCHA secret key" },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: recaptchaSecretKey,
          response: token,
        }),
      }
    );
    if (!response) {
      return new NextResponse(
        JSON.stringify({ error: { message: "Invalid URL ! No Response" } }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const data = await response.json();
    if (data.success) {
      return new NextResponse(
        JSON.stringify({ message: "reCAPTCHA verified successfully", data }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: "reCAPTCHA verification failed",
            details: data["error-codes"],
          },
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("error fetching url", error);
    return new NextResponse(
      JSON.stringify({ error: { message: "Internal Error" } }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
