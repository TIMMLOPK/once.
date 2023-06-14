import { NextResponse } from "next/server";
import { PostData } from "../../../utils/api";

export async function POST(req: Request) {
  const body: PostData = await req.json();

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
    const req = await fetch(process.env.API_URL + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (!req.ok) {
      return NextResponse.json(
        { error: "Something went wrong", success: false , res},
        { status: 500 }
      );
    }
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

  if (!id) {
    return NextResponse.json(
      { error: "No id provided", success: false },
      { status: 400 }
    );
  }

  try {
    await fetch(process.env.API_URL + "/post/" + id, {
      method: "DELETE",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message, success: false },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "No id provided", success: false },
      { status: 400 }
    );
  }

  const req2 = await fetch(process.env.API_URL + "/post/" + id).catch((e) => {
    return NextResponse.json({ error: e.message, success: false });
  });

  const post = await req2.json();

  return NextResponse.json({ post, success: true });
}