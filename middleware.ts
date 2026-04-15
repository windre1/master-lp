import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected paths
  const isProtectedPath = path.startsWith('/dashboard') || path === '/';
  
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value || '';

  // Redirect to login if trying to access protected page without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if trying to access login or home with valid token
  if ((path === '/login' || path === '/') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
  ],
};
