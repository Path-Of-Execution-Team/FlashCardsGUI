import createMiddleware from 'next-intl/middleware';

import locales from './config/locales';

export default createMiddleware({
  locales,
  defaultLocale: locales[0],
});

export const config = {
  matcher: ['/', '/(en|pl)/:path*'],
};
