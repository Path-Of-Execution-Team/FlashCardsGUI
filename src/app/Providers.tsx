// src/app/Providers.tsx
'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import theme from '@/styles/theme';

type Props = {
  children: ReactNode;
  locale: string;
};

export function Providers({ children, locale }: Props) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
