import {createConnection} from '@/app/lib/db.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import {useUser} from '@/app/context/UserContext.js';

export async function POST(req){
    try{
        const {email, password} = await req.json();
        if(!email || !password){
            return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 })
        }

        const db = await createConnection();
         const [rows] = await db.query(
                 'SELECT id, FullName, Email, Password FROM users WHERE Email = ?',
                 [email]
         )

         if(!rows || rows.lenght === 0){
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
         }

         const user = rows[0];
         const match = await bcrypt.compare(password, user.Password);

         if(!match){
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
         }

         
      const safeUser = {
         id: user.id,
          name: user.FullName,
           email: user.Email, 
           password: user.Password,
        profilePicture: 'images/user-picture.jpg'
        };


       return NextResponse.json({ success: true, user: safeUser })


    }catch(error){
        return NextResponse.json({success: false, error:'Server error'},{status: 500})
    }
}


