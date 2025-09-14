import {createConnection} from '@/app/lib/db.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const db = await createConnection();
        const [rows] = await db.query("select id, FullName, Email, Password from users");
       return NextResponse.json({user: rows})
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

    return new Response(JSON.stringify({id: result.insertId},{status: 201}))

 }catch(error){
     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
 }
    
}


export async function PUT(req){
    try{
        const db = await createConnection();
        const body = await req.json();
        const{id, fullName, email } = body;

        await db.query(
            "UPDATE users SET FullName = ?, Email = ? WHERE id = ?",
            [fullName, email, id]
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }catch(error){
         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


