import axios from 'axios';

export const AUTH_TOKEN_CACHE_KEY = 'moomento.auth-token';

const AUTH_TOKEN_COOKIE_NAME = 'authToken';
const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

export type AuthTokenSnapshot = {
  token: string | null;
  isHydrated: boolean;
};

const serverAuthTokenSnapshot: AuthTokenSnapshot = {
  token: null,
  isHydrated: false,
};

const authTokenListeners = new Set<() => void>();

const readTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;

  const prefix = `${AUTH_TOKEN_COOKIE_NAME}=`;
  const cookie = document.cookie.split('; ').find(row => row.startsWith(prefix));

  if (!cookie) return null;

  try {
    return decodeURIComponent(cookie.slice(prefix.length)) || null;
  } catch {
    return cookie.slice(prefix.length) || null;
  }
};

const readTokenFromCache = () => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(AUTH_TOKEN_CACHE_KEY) || readTokenFromCookie();
  } catch {
    return readTokenFromCookie();
  }
};

const initialClientToken = readTokenFromCache();

let authTokenSnapshot: AuthTokenSnapshot = {
  token: initialClientToken,
  isHydrated: typeof window !== 'undefined',
};

const emitAuthTokenChange = () => {
  authTokenListeners.forEach(listener => listener());
};

const updateAuthTokenSnapshot = (token: string | null, isHydrated = true) => {
  if (authTokenSnapshot.token === token && authTokenSnapshot.isHydrated === isHydrated) return;

  authTokenSnapshot = {
    token,
    isHydrated,
  };
  emitAuthTokenChange();
};

const writeAuthTokenCookie = (token: string | null) => {
  if (typeof document === 'undefined') return;

  if (!token) {
    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    return;
  }

  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${AUTH_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
};

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token: string | null) {
  if (typeof window !== 'undefined') {
    try {
      if (token) {
        window.localStorage.setItem(AUTH_TOKEN_CACHE_KEY, token);
      } else {
        window.localStorage.removeItem(AUTH_TOKEN_CACHE_KEY);
      }
    } catch {
      // The cookie remains the fallback when browser storage is unavailable.
    }
  }

  writeAuthTokenCookie(token);
  updateAuthTokenSnapshot(token);
}

export function hydrateAuthTokenFromCache() {
  if (typeof window === 'undefined') return;

  const token = readTokenFromCache();
  writeAuthTokenCookie(token);
  updateAuthTokenSnapshot(token);
}

export function syncAuthTokenFromStorage(event: StorageEvent) {
  if (event.key !== AUTH_TOKEN_CACHE_KEY && event.key !== null) return;

  const token = event.key === null ? null : event.newValue;
  writeAuthTokenCookie(token);
  updateAuthTokenSnapshot(token);
}

export function getAuthTokenSnapshot() {
  return authTokenSnapshot;
}

export function getServerAuthTokenSnapshot() {
  return serverAuthTokenSnapshot;
}

export function subscribeToAuthToken(listener: () => void) {
  authTokenListeners.add(listener);

  return () => {
    authTokenListeners.delete(listener);
  };
}

export function setApiClientLocale(locale: string) {
  apiClient.defaults.headers.common['Accept-Language'] = locale;
}

apiClient.interceptors.request.use(config => {
  const authToken = getAuthTokenSnapshot().token;

  if (authToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    const url: string | undefined = error?.config?.url;

    const isLoginRequest = url?.includes('/auth/login');

    if (!isLoginRequest && (status === 401 || status === 403) && typeof window !== 'undefined') {
      setAuthToken(null);

      const segments = window.location.pathname.split('/');
      const locale = segments[1] || 'pl';

      window.location.href = `/${locale}/auth/login`;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
