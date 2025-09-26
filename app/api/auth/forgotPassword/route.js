import { createConnection } from '@/app/lib/db.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json(); 
    if (!email) return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });

    const db = await createConnection();
    const [rows] = await db.query('SELECT id FROM users WHERE Email = ?', [email]);
    const user = rows[0];
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expiry = Date.now() +1800000; 

    await db.query('UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?', [hashedToken, expiry, user.id]);

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetPassword?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset',
      html: `<h2>Password Reset</h2><p>Click link below:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
