import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public paths that don't need auth
  const isPublicPath = path === '/login';
  
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value || '';

  // Redirect to login if trying to access private page without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to home if trying to access login with valid token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Define which paths should be processed by middleware
export const config = {
  matcher: [
    '/',
    '/login',
    '/lp/:path*',
  ],
};
