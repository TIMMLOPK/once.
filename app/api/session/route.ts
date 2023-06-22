import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
  });

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
