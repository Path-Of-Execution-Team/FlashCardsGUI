'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ReactNode, useEffect } from 'react';

import { useAuth } from './AuthProvider';

type GuestOnlyProps = {
  children: ReactNode;
};

const GuestOnly = ({ children }: GuestOnlyProps) => {
  const { isAuthenticated, isHydrated } = useAuth();
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, isHydrated, locale, router]);

  if (!isHydrated || isAuthenticated) {
    return (
      <Box sx={{ minHeight: 'calc(100svh - 72px)', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={32} aria-label="Checking session" />
      </Box>
    );
  }

  return children;
};

export default GuestOnly;
