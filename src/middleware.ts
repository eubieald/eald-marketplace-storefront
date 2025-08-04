import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE } from './modules/auth/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedPage = pathname.startsWith('/dashboard');

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // NOTE: Always inject x-current-path Header
  const response = NextResponse.next();
  response.headers.set('x-current-path', pathname);

  return response;
}

// NOTE: Update matcher to include ALL PAGES
export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*).*)'],
};
