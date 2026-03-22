import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send email to your Gmail
    const resend = getResend();
    const toEmail = process.env.RESEND_TO_EMAIL || "studybuddy967@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const testToEmail = process.env.RESEND_TEST_TO_EMAIL || "kaishee123@gmail.com";
    const recipient = fromEmail.endsWith("resend.dev") ? testToEmail : toEmail;
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);

      if (
        result.error.statusCode === 403 &&
        String(result.error.message || "").toLowerCase().includes("testing domain restriction")
      ) {
        return NextResponse.json(
          {
            error:
              "Resend testing domain can only send to your own account email. Verify your domain in Resend to send to other recipients.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: "Failed to send email. Please try again in a moment." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Thanks, your message is received. We will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Message could not be sent right now. Please try again shortly." },
      { status: 500 }
    );
  }
}