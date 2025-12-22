import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthorized = Boolean(accessToken || refreshToken);

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPrivateRoute && !isAuthorized) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url)
    );
  }

  if (isPublicRoute && isAuthorized) {
    return NextResponse.redirect(
      new URL('/profile', request.url) 
    );
  }
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-up',
    '/sign-in',
  ]
}