const locales = ['en', 'pl'] as const;

/* Don't forget to update matchers in middleware.ts */

export default locales;
export type Locale = (typeof locales)[number];
