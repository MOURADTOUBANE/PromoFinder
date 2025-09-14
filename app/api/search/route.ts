{/*import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "promo";
  const apiKey = process.env.GOOGLE_API_KEY!;
  const cx = process.env.GOOGLE_CX!;

  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedQuery}`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
  */}
