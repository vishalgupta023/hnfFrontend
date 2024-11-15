import { NextRequest, NextResponse } from 'next/server';
import { getSessionDetails } from './helpers/verifyAuth';

export async function middleware(req: NextRequest) {
  const session = await getSessionDetails(req);

  if (!session || session.status !== 200) {
    if (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/signup') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/login`);
    }
  } else {
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/`);
    }
    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/activities' || req.nextUrl.pathname === '/all-activities') {
      const token = req.cookies.get("token")
      const response = NextResponse.next();
      response.headers.set('x-user-name', session.data.user.name);  // Set user name header
      response.headers.set('x-user-role', session.data.user.role);
      response.headers.set('x-user-id', session.data.user._id);
      return response
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};


