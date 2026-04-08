import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("refreshToken");
  const { pathname } = request.nextUrl;

  // 1. If user is logged in and tries to access /login, send them to /profile
  if (pathname === "/login" && cookie?.value) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // 2. If user is NOT logged in and tries to access ANY protected route
  // BUT make sure we don't redirect them if they are already going to /login
  if (!cookie?.value && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/developer/:path*",
    "/school/:path*",
    "/student/:path*",
    "/teacher/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
