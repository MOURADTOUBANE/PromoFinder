import { createConnection } from '@/app/lib/db.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { token, password } = await req.json(); 
    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const db = await createConnection();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const [rows] = await db.query(
      'SELECT id, resetTokenExpiry FROM users WHERE resetToken = ?',
      [hashedToken]
    );
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 400 });
    }

    if (user.resetTokenExpiry < Date.now()) {
      return NextResponse.json({ success: false, message: 'Token expired' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'UPDATE users SET Password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
