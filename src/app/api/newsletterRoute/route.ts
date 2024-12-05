import { NextRequest, NextResponse } from "next/server";
import { SendEmail } from "@/lib/mail";
import { readFileSync } from "fs";
import path from "path";
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const newsletterPath = path.join(
    process.cwd(),
    "public",
    "component",
    "newsletter",
    "index.html"
  );

  const htmlContent = readFileSync(newsletterPath, "utf-8");
  if (!htmlContent) {
    return new NextResponse(
      JSON.stringify({
        error: { message: "Newsletter template not found!" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const smtpEmail = `AC CORP ${process.env.SMTP_EMAIL || "AC@corp.com"}`;
  if (!smtpEmail) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "SMTP email is not configured in environment variables!",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const sendMail = await SendEmail({
      to: email,
      from: smtpEmail,
      subject: "Thank you for subscribing to our newsletter",
      text: "Welcome to our newsLetter",
      html: htmlContent,
    });
    return new NextResponse(
      JSON.stringify({ message: "NewsLetter sent successfully", sendMail }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new NextResponse(
      JSON.stringify({
        error: { message: "Failed to send the newsletter!" },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
