import {createConnection} from '@/app/lib/db.js';

export async function POST(req, { params }) {
  const db = await createConnection();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { productId } = params;

  if (!userId || !productId) {
    return Response.json({ error: "Missing userId or productId" }, { status: 400 });
  }

  await db.query(
    "DELETE FROM favorite_products WHERE user_id = ? AND productId = ?",
    [userId, productId]
  );

  return Response.json({ success: true });
}
