import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_AUTH_COOKIE } from "@/constants/auth";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const demoAuth = request.cookies.get(DEMO_AUTH_COOKIE)?.value;
  if (!token && demoAuth !== "1") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" - to protect routes
export const config = {
  matcher: ["/developer/:path*", "/school/:path*"],
};
