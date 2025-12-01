// src/app/[locale]/layout.tsx
import Container from '@mui/material/Container';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';

import { Providers } from '../Providers';

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

  return (
    <html lang={locale} className={roboto.variable}>
      <body
        style={{
          margin: 0,
          backgroundImage: 'linear-gradient(135deg, #020617 0%, #111827 40%, #1f2937 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          }}>
          <Providers locale={locale}>{children}</Providers>
        </Container>
      </body>
    </html>
  );
}
