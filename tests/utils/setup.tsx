import '@testing-library/jest-dom/vitest';

import React from 'react';
import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/login',
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'pl',
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
    redirect: vi.fn(),
    usePathname: () => '/login',
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    getPathname: () => '/login',
  }),
}));
