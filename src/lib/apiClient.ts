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

export function setApiClientLocale(locale: string) {
  apiClient.defaults.headers.common['Accept-Language'] = locale;
}

export default apiClient;
