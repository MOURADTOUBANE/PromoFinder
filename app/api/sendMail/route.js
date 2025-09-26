import nodemailer from "nodemailer";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   
    await transporter.sendMail({
      from: `${email}`,
      to:  `"DealHunter Support" <${process.env.EMAIL_USER}>`, 
      subject: `[Support] ${subject}`,
      text: `
        Name: ${name}
        Message: ${message}
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
