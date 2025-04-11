import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin';

const ALLOWED_EMAIL = 'marcrenton83@gmail.com';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // 로그인 페이지는 항상 허용
  if (request.nextUrl.pathname === '/login') {
    if (session) {
      try {
        const decodedClaims = await auth.verifySessionCookie(session, true);
        if (decodedClaims.email === ALLOWED_EMAIL) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        // 세션이 유효하지 않은 경우 로그인 페이지에 머무름
      }
    }
    return NextResponse.next();
  }

  // 세션이 없는 경우 로그인 페이지로 리디렉션
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 세션 검증
    const decodedClaims = await auth.verifySessionCookie(session, true);
    
    // 허용된 이메일만 접근 가능
    if (decodedClaims.email !== ALLOWED_EMAIL) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // 세션이 유효하지 않은 경우 로그인 페이지로 리디렉션
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 