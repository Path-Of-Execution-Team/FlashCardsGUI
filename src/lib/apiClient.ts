import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  console.warn('NEXT_PUBLIC_API_URL is not set');
}

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;

  if (typeof document === 'undefined') return;

  if (token) {
    document.cookie = `authToken=${token}; Path=/; Max-Age=86400; SameSite=Lax`;
  } else {
    document.cookie = 'authToken=; Path=/; Max-Age=0; SameSite=Lax';
  }
}

export function loadAuthTokenFromCookie() {
  if (typeof document === 'undefined') return;

  const match = document.cookie.split('; ').find(row => row.startsWith('authToken='));

  if (match) {
    const value = match.split('=')[1];
    authToken = value || null;
  }
}

export function setApiClientLocale(locale: string) {
  apiClient.defaults.headers.common['Accept-Language'] = locale;
}

apiClient.interceptors.request.use(config => {
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

      window.location.href = `/${locale}/login`;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
