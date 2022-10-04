// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/iorl")
    return NextResponse.redirect(new URL("/lori", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/iorl",
};
