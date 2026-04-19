/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get('refreshToken');
  const cookieStore = await cookies();

  console.log({
    cookieStore: cookieStore.get('refreshToken'),
    request: request.cookies.get('refreshToken'),
    cookie: request.cookies,
  });
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
