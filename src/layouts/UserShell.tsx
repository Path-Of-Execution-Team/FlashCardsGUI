'use client';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useAuth } from '@/auth/AuthProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Link, usePathname } from '@/i18n/navigation';
import CowLogoIcon from '@/icons/CowLogoIcon';

type UserShellProps = {
  children: React.ReactNode;
};

const navigation = [
  {
    href: '/dashboard',
    label: 'dashboard',
    icon: DashboardRoundedIcon,
  },
  {
    href: '/settings',
    label: 'settings',
    icon: SettingsRoundedIcon,
  },
] as const;

const UserShell = ({ children }: UserShellProps) => {
  const t = useTranslations('userShell');
  const locale = useLocale();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated, logout } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      window.location.replace(`/${locale}/auth/login`);
    }
  }, [isAuthenticated, isHydrated, locale]);

  const handleLogout = () => {
    logout();
    window.location.replace(`/${locale}/auth/login`);
  };

  if (!isHydrated || !isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100svh', display: 'grid', placeItems: 'center', bgcolor: 'background.default' }}>
        <CircularProgress size={34} aria-label={t('checkingSession')} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '248px minmax(0, 1fr)' },
        bgcolor: 'background.default',
      }}>
      <Box
        component="aside"
        sx={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: 'var(--fc-brand-surface)',
          color: 'var(--fc-brand-on)',
          borderRight: '1px solid var(--fc-brand-border)',
          px: 2.25,
          py: 2.5,
        }}>
        <Link
          href="/dashboard"
          aria-label={t('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 11,
            color: 'inherit',
            textDecoration: 'none',
            padding: '4px 8px',
          }}>
          <Box
            sx={{
              width: 39,
              height: 39,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '11px',
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              transform: 'rotate(-3deg)',
            }}>
            <CowLogoIcon sx={{ fontSize: 29 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 21, letterSpacing: '-0.045em' }}>{t('appName')}</Typography>
        </Link>

        <Box component="nav" aria-label={t('navigation')} sx={{ mt: 6, display: 'grid', gap: 0.75 }}>
          {navigation.map(item => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                data-testid={`user-nav-${item.label}`}
                variant="text"
                startIcon={<Icon />}
                sx={{
                  minHeight: 48,
                  justifyContent: 'flex-start',
                  px: 1.5,
                  color: active ? 'var(--fc-brand-on)' : 'var(--fc-brand-on-muted)',
                  bgcolor: active ? 'var(--fc-brand-border)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'var(--fc-brand-border)',
                    color: 'var(--fc-brand-on)',
                    transform: 'none',
                  },
                }}>
                {t(item.label)}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ mt: 'auto', pt: 2.5, borderTop: '1px solid var(--fc-brand-border)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 0.75 }}>
            <Avatar sx={{ width: 38, height: 38, bgcolor: 'secondary.main', color: 'secondary.contrastText', fontSize: 14, fontWeight: 800 }}>
              AM
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--fc-brand-on)' }} noWrap>
                {t('profileName')}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'var(--fc-brand-on-muted)' }} noWrap>
                {t('profileEmail')}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={handleLogout}
            data-testid="logout-button"
            variant="text"
            startIcon={<LogoutRoundedIcon />}
            sx={{
              width: '100%',
              mt: 1.5,
              justifyContent: 'flex-start',
              color: 'var(--fc-brand-on-muted)',
              '&:hover': {
                bgcolor: 'var(--fc-brand-border)',
                color: 'var(--fc-brand-on)',
                transform: 'none',
              },
            }}>
            {t('logout')}
          </Button>
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 15,
            minHeight: 72,
            display: 'flex',
            alignItems: 'center',
            px: { xs: 2, sm: 3, lg: 4 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'var(--fc-header-background)',
            backdropFilter: 'blur(18px)',
          }}>
          <Link
            href="/dashboard"
            aria-label={t('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                display: { xs: 'grid', md: 'none' },
                placeItems: 'center',
                borderRadius: '10px',
                bgcolor: 'var(--fc-brand-surface)',
                color: 'secondary.main',
              }}>
              <CowLogoIcon sx={{ fontSize: 27 }} />
            </Box>
            <Typography sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 800, letterSpacing: '-0.04em' }}>{t('appName')}</Typography>
          </Link>

          <Typography
            variant="caption"
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
            <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'secondary.main' }} />
            {t('mockData')}
          </Typography>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </Box>
        </Box>

        <Box sx={{ pb: { xs: 10, md: 0 } }}>{children}</Box>
      </Box>

      <Box
        component="nav"
        aria-label={t('navigation')}
        sx={{
          position: 'fixed',
          left: 12,
          right: 12,
          bottom: 12,
          zIndex: 25,
          display: { xs: 'grid', md: 'none' },
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 0.5,
          p: 0.75,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: 'var(--fc-menu-shadow)',
        }}>
        {navigation.map(item => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              data-testid={`mobile-user-nav-${item.label}`}
              variant="text"
              startIcon={<Icon />}
              sx={{
                minHeight: 48,
                color: active ? 'primary.main' : 'text.secondary',
                bgcolor: active ? 'var(--fc-accent-soft)' : 'transparent',
                '&:hover': { bgcolor: 'var(--fc-accent-soft)', transform: 'none' },
              }}>
              {t(item.label)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default UserShell;
