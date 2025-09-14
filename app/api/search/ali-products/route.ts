{/*
  import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const appKey = process.env.APP_KEY!;
  const appSecret = process.env.APP_SECRET!;

  // Example parameters
  const params = {
    fields: "productId,productTitle,productUrl",
    pageNo: 1,
    pageSize: 10,
  };

  // Convert params to query string
  const queryString = Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  // Generate signature
  const signString = `app_key${appKey}${queryString}${appSecret}`;
  const signature = crypto.createHash("md5").update(signString).digest("hex");

  // Final API URL
  const url = `https://api.aliexpress.com/products?${queryString}&app_key=${appKey}&sign=${signature}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products", details: error });
  }
}
*/}