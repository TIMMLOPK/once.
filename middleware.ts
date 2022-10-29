import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req: NextRequest) {
  const { nextUrl: url } = req;
  const country = req.geo?.country || "unknown";

  url.searchParams.set('country', country);

  return NextResponse.rewrite(url);
}
