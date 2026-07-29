import '../globals.css';

import Box from '@mui/material/Box';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';

import AppHeader from '@/components/AppHeader';
import { routing } from '@/i18n/routing';

import { Providers } from './Providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={roboto.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript defaultMode="system" />
        <Providers locale={locale} messages={messages}>
          <Box sx={{ minHeight: '100vh', overflow: 'clip' }}>
            <AppHeader />
            <Box component="main">{children}</Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
