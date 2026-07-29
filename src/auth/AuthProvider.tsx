'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

import {
  getAuthTokenSnapshot,
  getServerAuthTokenSnapshot,
  hydrateAuthTokenFromCache,
  setAuthToken,
  subscribeToAuthToken,
  syncAuthTokenFromStorage,
} from '@/lib/apiClient';

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const snapshot = useSyncExternalStore(subscribeToAuthToken, getAuthTokenSnapshot, getServerAuthTokenSnapshot);

  useEffect(() => {
    hydrateAuthTokenFromCache();
    window.addEventListener('storage', syncAuthTokenFromStorage);

    return () => {
      window.removeEventListener('storage', syncAuthTokenFromStorage);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: snapshot.token,
      isAuthenticated: Boolean(snapshot.token),
      isHydrated: snapshot.isHydrated,
      login: token => setAuthToken(token),
      logout: () => setAuthToken(null),
    }),
    [snapshot]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
