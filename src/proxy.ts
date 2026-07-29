import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import locales from './config/locales';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: locales[0],
});

const protectedRoutes = new Set(['dashboard', 'settings']);
const guestRoutes = new Set(['login', 'register']);

export default function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);
  const locale = locales.find(candidate => candidate === segments[0]);

  if (!locale) {
    return intlMiddleware(request);
  }

  const route = segments[1];
  const authRoute = route === 'auth' ? segments[2] : undefined;
  const hasToken = Boolean(request.cookies.get('authToken')?.value);

  if (route && protectedRoutes.has(route) && !hasToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/auth/login`;
    loginUrl.searchParams.set('from', request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (authRoute && guestRoutes.has(authRoute) && hasToken) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = `/${locale}/dashboard`;
    dashboardUrl.search = '';

    return NextResponse.redirect(dashboardUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|pl)/:path*'],
};
