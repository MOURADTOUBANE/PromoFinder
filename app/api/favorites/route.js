import {createConnection} from '@/app/lib/db.js';
import { error } from 'console';

export async function POST (req){
      const db = await createConnection();
    const { userId, product} = await req.json();

   if (!userId || (!product?.id && !product?.productId)) {
  return Response.json({ error: "Invalid payload" }, { status: 400 });
}


    const [exists] = await db.query(
         "SELECT * FROM favorite_products WHERE user_id = ? AND productId = ?",
    [userId, product.productId || product.id]
    );

    if (exists.length === 0) {
    await db.query(
      `INSERT INTO favorite_products 
      (user_id, productId, productTitle, productImage, productDiscount, productPrice, productCurrency, productOriginalPrice, productRating, productOrders, productUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
       product.productId || product.id,
        product.title,
        product.image || product.imageUrl,
        product.discount,
        product.price,
        product.currency,
        product.originalPrice,
        product.rating,
        product.orders ,
        product.productUrl || product.url,
      ]
    );
  }

  return Response.json({ success: true });
}


export async function GET(req) {
  const db = await createConnection();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId required" }, { status: 400 });
  }

  const [favorites] = await db.query(
    "SELECT * FROM favorite_products WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );

  return Response.json(favorites);
}