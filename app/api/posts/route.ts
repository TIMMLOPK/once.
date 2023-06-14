import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  const req = await fetch(process.env.API_URL + "/posts").catch((e) => {
    return NextResponse.json({ error: e.message });
  });
  const posts = await req.json();

  return NextResponse.json({ posts, timestamp: Date.now() });
}
