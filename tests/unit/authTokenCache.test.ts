import { beforeEach, describe, expect, it } from 'vitest';

import { AUTH_TOKEN_CACHE_KEY, getAuthTokenSnapshot, hydrateAuthTokenFromCache, setAuthToken, syncAuthTokenFromStorage } from '@/lib/apiClient';

describe('auth token cache', () => {
  beforeEach(() => {
    setAuthToken(null);
    window.localStorage.clear();
  });

  it('stores the token in memory, local storage and a cookie', () => {
    setAuthToken('FAKE_JWT');

    expect(getAuthTokenSnapshot()).toEqual({
      token: 'FAKE_JWT',
      isHydrated: true,
    });
    expect(window.localStorage.getItem(AUTH_TOKEN_CACHE_KEY)).toBe('FAKE_JWT');
    expect(document.cookie).toContain('authToken=FAKE_JWT');
  });

  it('restores a cached token', () => {
    window.localStorage.setItem(AUTH_TOKEN_CACHE_KEY, 'CACHED_JWT');

    hydrateAuthTokenFromCache();

    expect(getAuthTokenSnapshot().token).toBe('CACHED_JWT');
    expect(document.cookie).toContain('authToken=CACHED_JWT');
  });

  it('reacts to login and logout in another browser tab', () => {
    syncAuthTokenFromStorage(
      new StorageEvent('storage', {
        key: AUTH_TOKEN_CACHE_KEY,
        newValue: 'OTHER_TAB_JWT',
      })
    );
    expect(getAuthTokenSnapshot().token).toBe('OTHER_TAB_JWT');

    syncAuthTokenFromStorage(
      new StorageEvent('storage', {
        key: AUTH_TOKEN_CACHE_KEY,
        newValue: null,
      })
    );
    expect(getAuthTokenSnapshot().token).toBeNull();
  });
});
