import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For a production app, you would integrate with an email service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer with SMTP

    // For now, we'll store the message and return success
    // The actual email will be triggered via mailto on the client

    const contactEmail = "contact.raisulrafi@gmail.com"

    // Log the submission (in production, you'd save to database or send via email API)
    console.log("Contact form submission:", {
      to: contactEmail,
      from: email,
      name,
      message,
      date: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      mailto: `mailto:${contactEmail}?subject=Contact from ${name}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
