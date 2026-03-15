import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { loadAuthTokenFromCookieMock, setApiClientLocaleMock } = vi.hoisted(() => ({
  loadAuthTokenFromCookieMock: vi.fn(),
  setApiClientLocaleMock: vi.fn(),
}));

vi.mock('@/lib/apiClient', () => ({
  loadAuthTokenFromCookie: loadAuthTokenFromCookieMock,
  setApiClientLocale: setApiClientLocaleMock,
}));
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { Providers } from '@/app/[locale]/Providers';

describe('Providers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children and initializes locale-specific API setup', async () => {
    render(
      <Providers locale="pl" messages={{ appName: 'FlashCards' }}>
        <div>child-content</div>
      </Providers>
    );

    expect(screen.getByText('child-content')).toBeInTheDocument();

    await waitFor(() => {
      expect(setApiClientLocaleMock).toHaveBeenCalledWith('pl');
      expect(loadAuthTokenFromCookieMock).toHaveBeenCalled();
    });
  });
});
