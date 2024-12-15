import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const recaptchaSecretKey = process.env.GOOGLE_RECAPTCHA_SECRET;

  // Check if the secret key is missing
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
    // Make a POST request to Google's reCAPTCHA verification endpoint
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

    // Check for HTTP errors in the response
    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: `Failed to verify reCAPTCHA, status: ${response.status}`,
          },
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the response body
    const data = await response.json();

    // Check the reCAPTCHA verification response
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
      // Return an error response if verification failed
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
    // Log the error and return a 500 response
    console.error("Error during reCAPTCHA verification:", error);
    return new NextResponse(
      JSON.stringify({
        error: { message: "Internal Error during reCAPTCHA verification" },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
