'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect } from 'react';

import { AuthProvider } from '@/auth/AuthProvider';
import { setApiClientLocale } from '@/lib/apiClient';
import theme from '@/styles/theme';

type ProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export function Providers({ children, locale, messages }: ProvidersProps) {
  useEffect(() => {
    setApiClientLocale(locale);
  }, [locale]);

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={'Europe/Warsaw'}>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
