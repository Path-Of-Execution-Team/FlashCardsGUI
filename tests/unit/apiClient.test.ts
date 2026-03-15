import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('apiClient', () => {
  beforeEach(() => {
    vi.resetModules();
    document.cookie = 'authToken=; Path=/; Max-Age=0; SameSite=Lax';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.cookie = 'authToken=; Path=/; Max-Age=0; SameSite=Lax';
  });

  it('loads the auth token from cookies and applies locale and authorization headers', async () => {
    const { default: apiClient, loadAuthTokenFromCookie, setApiClientLocale } = await import('@/lib/apiClient');

    document.cookie = 'authToken=cookie-token; Path=/; SameSite=Lax';
    loadAuthTokenFromCookie();
    setApiClientLocale('en');

    const requestHandler = (
      apiClient.interceptors.request as { handlers: Array<{ fulfilled: (config: { headers: Record<string, string> }) => unknown }> }
    ).handlers[0].fulfilled;
    const config = requestHandler({ headers: {} }) as { headers: Record<string, string> };

    expect(config.headers.Authorization).toBe('Bearer cookie-token');
    expect(apiClient.defaults.headers.common['Accept-Language']).toBe('en');
  });

  it('redirects unauthorized non-login requests to the localized login page', async () => {
    const { default: apiClient, setAuthToken } = await import('@/lib/apiClient');

    const browserWindow = {
      location: {
        pathname: '/en/dashboard',
        href: '',
      },
    };

    vi.stubGlobal('window', browserWindow);
    setAuthToken('jwt-token');

    const rejectHandler = (apiClient.interceptors.response as { handlers: Array<{ rejected: (error: unknown) => Promise<unknown> }> }).handlers[0]
      .rejected;
    const error = {
      response: { status: 401 },
      config: { url: '/users/me' },
    };

    await expect(rejectHandler(error)).rejects.toBe(error);
    expect(browserWindow.location.href).toBe('/en/auth/login');

    const requestHandler = (
      apiClient.interceptors.request as { handlers: Array<{ fulfilled: (config: { headers: Record<string, string> }) => unknown }> }
    ).handlers[0].fulfilled;
    const config = requestHandler({ headers: {} }) as { headers: Record<string, string> };

    expect(config.headers.Authorization).toBeUndefined();
  });

  it('does not redirect when the failed request is the login call itself', async () => {
    const { default: apiClient } = await import('@/lib/apiClient');

    const browserWindow = {
      location: {
        pathname: '/pl/auth/login',
        href: '',
      },
    };

    vi.stubGlobal('window', browserWindow);

    const rejectHandler = (apiClient.interceptors.response as { handlers: Array<{ rejected: (error: unknown) => Promise<unknown> }> }).handlers[0]
      .rejected;
    const error = {
      response: { status: 403 },
      config: { url: '/auth/login' },
    };

    await expect(rejectHandler(error)).rejects.toBe(error);
    expect(browserWindow.location.href).toBe('');
  });
});
