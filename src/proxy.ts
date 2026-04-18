/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const cookie = request.cookies.get('refreshToken');
  const { pathname } = request.nextUrl;

  // Define public paths
  const isPublicPath = pathname === '/' || pathname === '/login';

  // Debugging log for Vercel logs
  console.log(`Path: ${pathname} | HasCookie: ${!!cookie?.value}`);

  // 1. If user has a token and tries to go to login -> send to dashboard
  // if (cookie?.value && isPublicPath) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // 2. If user has NO token and tries to go to protected route -> send to login
  // if (!cookie?.value && !isPublicPath) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

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
