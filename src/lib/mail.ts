import nodemailer from "nodemailer";

interface EmailProps {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export async function SendEmail({ to, from, subject, text, html }: EmailProps) {
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify transporter connection
    await transporter.verify();
    console.log("Server is ready to take our messages");

    // Create the email message
    const message = {
      from: from || process.env.SMTP_EMAIL,
      to,
      subject,
      text,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
