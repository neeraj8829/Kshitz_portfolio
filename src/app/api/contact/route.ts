import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In local development or before Resend/Nodemailer is configured, log inquiry
    console.log("=== NEW INQUIRY RECEIVED FOR KSHITIZ ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject || "Portfolio Contact Inquiry"}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("========================================");

    /*
     * How to connect Resend or Nodemailer for real email delivery:
     *
     * 1. Add RESEND_API_KEY to your .env.local:
     *    RESEND_API_KEY=re_123456789
     *
     * 2. npm install resend
     *
     * 3. Uncomment this block:
     *
     *    import { Resend } from "resend";
     *    const resend = new Resend(process.env.RESEND_API_KEY);
     *    await resend.emails.send({
     *      from: "Kshitiz Portfolio <onboarding@resend.dev>",
     *      to: "hello@kshitiz.dev",
     *      subject: `New Portfolio Message: ${subject || "Inquiry"} from ${name}`,
     *      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
     *    });
     */

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Kshitiz will respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again or email hello@kshitiz.dev." },
      { status: 500 }
    );
  }
}

