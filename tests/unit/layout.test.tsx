import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('RootLayout', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns the localized document structure for supported locales', async () => {
    const hasLocaleMock = vi.fn().mockReturnValue(true);
    const getMessagesMock = vi.fn().mockResolvedValue({ appName: 'FlashCards' });

    vi.doMock('next/font/google', () => ({
      Roboto: () => ({ variable: '--font-roboto' }),
    }));
    vi.doMock('next-intl', () => ({
      hasLocale: hasLocaleMock,
    }));
    vi.doMock('next-intl/server', () => ({
      getMessages: getMessagesMock,
    }));
    vi.doMock('next/navigation', () => ({
      notFound: vi.fn(),
    }));

    const { default: RootLayout } = await import('@/app/[locale]/layout');
    const result = (await RootLayout({
      children: React.createElement('main', null, 'child-page'),
      params: Promise.resolve({ locale: 'en' }),
    })) as React.ReactElement<{ lang: string; children: React.ReactNode }>;

    expect(hasLocaleMock).toHaveBeenCalled();
    expect(getMessagesMock).toHaveBeenCalled();
    expect(result.props.lang).toBe('en');
  });

  it('delegates to notFound for unsupported locales', async () => {
    const notFoundError = new Error('not-found');
    const hasLocaleMock = vi.fn().mockReturnValue(false);
    const notFoundMock = vi.fn(() => {
      throw notFoundError;
    });

    vi.doMock('next/font/google', () => ({
      Roboto: () => ({ variable: '--font-roboto' }),
    }));
    vi.doMock('next-intl', () => ({
      hasLocale: hasLocaleMock,
    }));
    vi.doMock('next-intl/server', () => ({
      getMessages: vi.fn(),
    }));
    vi.doMock('next/navigation', () => ({
      notFound: notFoundMock,
    }));

    const { default: RootLayout } = await import('@/app/[locale]/layout');

    await expect(
      RootLayout({
        children: React.createElement('main', null, 'child-page'),
        params: Promise.resolve({ locale: 'xx' }),
      })
    ).rejects.toThrow('not-found');

    expect(hasLocaleMock).toHaveBeenCalled();
    expect(notFoundMock).toHaveBeenCalled();
  });
});
