import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('refreshToken');
  const { pathname } = request.nextUrl;
  const isPublicPath = pathname === '/' || pathname === '/login';

  if (cookie?.value && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!cookie?.value && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/developer/:path*',
    '/school/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/profile/:path*',
    '/dashboard/:path*',
  ],
};
