import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function GET() {
  const req = await fetch(process.env.API_URL + "/posts", { next: { revalidate: 5 } }).catch((e) => {
    return NextResponse.json({ error: e.message });
  });
  const posts = await req.json();

  revalidatePath("/posts");

  return NextResponse.json({ posts, timestamp: Date.now() });
}
