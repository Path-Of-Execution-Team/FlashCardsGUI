import { defineRouting } from 'next-intl/routing';

import locales from '@/config/locales';

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
});
