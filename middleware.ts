import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  if (url.pathname === '/case1') {
    const requestHeaders = new Headers(request.headers);
    const variant = requestHeaders.get('X-Version') || 'control';
    if (variant ===  'control') {
      // console.log('case1-isr');
      return NextResponse.rewrite(new URL(`/case1/isr`, request.url));
    } else {
      // console.log('case1-ssr');
      return NextResponse.rewrite(new URL(`/case1/ssr`, request.url));
    }
  }
  else if (url.pathname === '/case2') {
    const requestHeaders = new Headers(request.headers);
    const variant = requestHeaders.get('X-Version') || 'control';
    if (variant !== 'control') {
      // console.log('case2-ssr');
      return NextResponse.rewrite(new URL(`/case2/ssr`, request.url));
    } else {
      // console.log('case2-isr');
      NextResponse.next();
    }
  }
  NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    /**
     * Case1, /case1 rewrites to /case1/ssr /case1/isr
     */
    '/case1',
    /**
     * Case2, /case2 (ISR) rewrites to /case2/ssr
     */
    '/case2',
  ],
}