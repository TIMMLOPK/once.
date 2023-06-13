import { NextResponse } from "next/server";

export async function GET() {
  const req = await fetch(process.env.API_URL + "/posts").catch((e: any) => {
    return NextResponse.json({ error: e.message });
  });
  const posts = await req.json();

  return NextResponse.json({ posts });
}
