import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const ProtectRoute = [
  '/mypage',
  '/myprofile',
  '/following',
  '/log/edit',
  '/log/write',
];
export default auth(req => {
  const { nextUrl } = req;

  //로그인 필요한 라우트 && 로그인 X
  if (isProtectedRoute(nextUrl.pathname) && !req.auth) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
});
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function isProtectedRoute(path: string) {
  for (let route of ProtectRoute) {
    if (path.startsWith(route)) {
      return true;
    }
  }
  return false;
}
