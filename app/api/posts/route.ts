import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  let posts;
  try {
    posts = (await sql`SELECT * FROM posts`).rows;
  } catch (e: any) {
    if (e.message === `relation "posts" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );

      await sql`CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          coverImage TEXT NOT NULL,
          date TEXT NOT NULL,
          ogImageURL TEXT NOT NULL,
          content TEXT NOT NULL,
          author TEXT NOT NULL,
          authorImage TEXT NOT NULL,
          published BOOLEAN NOT NULL DEFAULT false
        )`;
      posts = (await sql`SELECT * FROM posts`).rows;
    } else {
      console.error(e);
      return NextResponse.json({ error: e.message });
    }
  }

  return NextResponse.json({ posts });
}
