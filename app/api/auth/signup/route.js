import {createConnection} from '@/app/lib/db.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const db = await createConnection();
        const [rows] = await db.query("select id, FullName, Email from users");
       return NextResponse.json({users: rows})
    }catch(error){
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


export async function POST(req) {
 try{
    const db = await createConnection();
    const body = await req.json();
    const {fullName, email, password} = body;

    const hashedlPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
         "INSERT INTO users (FullName, Email, Password) VALUES (?, ?, ?)",
          [fullName, email, hashedlPassword]
    );

     const [rows] = await db.query(
                 'SELECT id, FullName, Email, Password FROM users WHERE Email = ?',
                 [email]
         )
         const user = rows[0];
         const safeUser = {
         id: user.id,
          name: user.FullName,
           email: user.Email, 
           password: user.Password,
        profilePicture: 'images/user-picture.jpg'
        };
        
      return new Response(
      JSON.stringify({ success: true, id: result.insertId,user:safeUser }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

    

 }catch(error){
     return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
 }
    
}





