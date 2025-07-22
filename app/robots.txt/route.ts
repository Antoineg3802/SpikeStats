import { NextResponse } from "next/server";

export function GET() {
  const isDev = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  const content = isDev
    ? `User-agent: *\nDisallow: /`
    : `User-agent: *\nAllow: /`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
