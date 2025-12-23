import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export  function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthorized = Boolean(accessToken || refreshToken);

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isPrivateRoute && !isAuthorized) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url)
    );
  }

  if (isAuthRoute && isAuthorized) {
    return NextResponse.redirect(
      new URL('/profile', request.url) 
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-up',
    '/sign-in',
  ]
}