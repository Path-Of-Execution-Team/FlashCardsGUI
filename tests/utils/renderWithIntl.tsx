import { NextIntlClientProvider } from 'next-intl';
import React, { ReactNode } from 'react';

export function renderWithIntl(children: ReactNode, locale = 'en', messages = {}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
