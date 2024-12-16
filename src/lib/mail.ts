import nodemailer from "nodemailer";

interface EmailProps {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export async function SendEmail({ to, subject, text, html }: EmailProps) {
  try {
    const service = process.env.SMTP_SERVICE || "zoho";
    let host, port, secure;

    if (service === "zoho") {
      host = process.env.SMTP_HOST || "smtp.zoho.com";
      port = 465;
      secure = true;
    }

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
    const smtpEmail = `AC CORP ${process.env.SMTP_EMAIL || "AC@corp.com"}`;

    // Create the email message
    const message = {
      from: smtpEmail,
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
