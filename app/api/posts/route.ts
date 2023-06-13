import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  let posts;
  const client = await db.connect();
  try {
    posts = (await client.sql`SELECT * FROM posts`).rows;
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }

  return NextResponse.json({ posts });
}
