'use client';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/auth/AuthProvider';
import { Link, usePathname } from '@/i18n/navigation';
import CowLogoIcon from '@/icons/CowLogoIcon';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const AppHeader = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();
  const isUserArea = pathname.startsWith('/dashboard') || pathname.startsWith('/settings');

  if (isUserArea) {
    return null;
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '1px solid',
        borderColor: 'var(--fc-header-border)',
        bgcolor: 'var(--fc-header-background)',
        backdropFilter: 'blur(18px)',
        transition: 'background-color 180ms ease, border-color 180ms ease',
      }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1320,
          minHeight: 72,
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          px: { xs: 2, sm: 3, lg: 4 },
        }}>
        <Link
          href="/"
          aria-label={t('nav.home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            color: 'inherit',
            textDecoration: 'none',
          }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '11px',
              bgcolor: 'var(--fc-brand-surface)',
              color: 'secondary.main',
              transform: 'rotate(-3deg)',
            }}>
            <CowLogoIcon sx={{ fontSize: 29 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 21, letterSpacing: '-0.045em' }}>{t('appName')}</Typography>
        </Link>

        <Box component="nav" aria-label={t('nav.primary')} sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, ml: 5 }}>
          <Link href="/#how-it-works" style={{ color: 'var(--mui-palette-text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            {t('nav.howItWorks')}
          </Link>
          <Link href="/#method" style={{ color: 'var(--mui-palette-text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            {t('nav.method')}
          </Link>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {!isHydrated && <Box aria-hidden sx={{ width: { xs: 0, sm: 188 }, height: 42 }} />}
          {isHydrated && isAuthenticated && (
            <Button
              component={Link}
              href="/dashboard"
              variant="outlined"
              aria-label={t('nav.myDashboard')}
              startIcon={<DashboardRoundedIcon />}
              sx={{
                minWidth: { xs: 42, sm: 'auto' },
                minHeight: 42,
                px: { xs: 1, sm: 1.5 },
                borderColor: 'divider',
                borderRadius: '12px',
                color: 'text.primary',
                '& .MuiButton-startIcon': { m: { xs: 0, sm: '0 8px 0 0' } },
                '&:hover': {
                  borderColor: 'text.secondary',
                  bgcolor: 'var(--fc-page-hover)',
                  transform: 'translateY(-1px)',
                },
              }}>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {t('nav.myDashboard')}
              </Box>
            </Button>
          )}
          {isHydrated && !isAuthenticated && (
            <>
              <Button
                component={Link}
                href="/auth/login"
                variant="outlined"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  minHeight: 42,
                  px: 1.75,
                  borderColor: 'divider',
                  borderRadius: '12px',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'text.secondary',
                    bgcolor: 'var(--fc-page-hover)',
                    transform: 'translateY(-1px)',
                  },
                }}>
                {t('nav.signIn')}
              </Button>
              <Button
                component={Link}
                href="/auth/register"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  minHeight: 42,
                  px: 2.25,
                  borderRadius: '12px',
                  fontSize: 14,
                  '&:hover': { bgcolor: 'var(--fc-action-hover)', transform: 'translateY(-1px)' },
                }}>
                {t('nav.start')}
              </Button>
            </>
          )}
          <ThemeSwitcher />
          <LanguageSwitcher />
        </Box>
      </Container>
    </Box>
  );
};

export default AppHeader;
