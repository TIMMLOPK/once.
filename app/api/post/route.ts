import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { PostData } from "../../../utils/api";

export async function POST(req: Request) {
  const body: PostData = await req.json();
  const client = await db.connect();

  if (!body) {
    return NextResponse.json(
      { error: "No body provided", success: false },
      { status: 400 }
    );
  }

  if (!body.title || body.title.length < 1) {
    return NextResponse.json(
      { error: "Title must be at least 1 character long", success: false },
      { status: 400 }
    );
  }

  if (!body.description || body.description.length < 1) {
    return NextResponse.json(
      {
        error: "Description must be at least 1 character long",
        success: false,
      },
      { status: 400 }
    );
  }

  if (!body.coverImage || body.coverImage.length < 1) {
    return NextResponse.json(
      {
        error: "Cover image must be at least 1 character long",
        success: false,
      },
      { status: 400 }
    );
  }

  if (!body.content || body.content.length < 1) {
    return NextResponse.json(
      { error: "Content must be at least 1 character long", success: false },
      { status: 400 }
    );
  }

  try {
    await client.sql`
        INSERT INTO posts (
            title,
            description,
            coverImage,
            date,
            ogImageURL,
            content,
            author,
            authorImage,
            published
        ) VALUES (
            ${body.title},
            ${body.description},
            ${body.coverImage},
            ${body.date},
            ${body.ogImageURL},
            ${body.content},
            ${body.author},
            ${body.authorImage},
            ${body.published}
        )
    `;
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message, success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const client = await db.connect();

  if (!id) {
    return NextResponse.json(
      { error: "No id provided", success: false },
      { status: 400 }
    );
  }

  try {
    await client.sql`
        DELETE FROM posts WHERE id = ${id}
    `;
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message, success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
