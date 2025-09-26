import {createConnection} from '@/app/lib/db.js';
import bcrypt from 'bcryptjs';


export async function PUT(req) {
  try {
    const body = await req.json();
   const { action, fullName, email, userId, password} = body; 

    const db = await createConnection();

    if (action === "edit") {

    await db.query(
      "UPDATE users SET FullName = ?, Email = ? WHERE id = ?",
      [fullName, email, userId]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });

    }else if (action === "changePassword") {
  const newPassword = await bcrypt.hash(password, 10);

  await db.query("UPDATE users SET Password = ? WHERE id = ?", [newPassword, userId]);

  const [rows] = await db.query("SELECT id, FullName, Email FROM users WHERE id = ?", [userId]);

  const user = rows[0];
  
         const safeUser = {
         id: user.id,
          name: user.FullName,
           email: user.Email, 
           password: user.Password,
        profilePicture: 'images/user-picture.jpg'
        };
        

  return new Response(JSON.stringify({ success: true, user: safeUser }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
} else {
  return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
}


   
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}