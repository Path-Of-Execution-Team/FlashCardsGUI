'use client';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';

const ThemeSwitcher = () => {
  const t = useTranslations('nav');
  const { mode, setMode, systemMode } = useColorScheme();
  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = resolvedMode === 'dark';
  const label = isDark ? t('useLightTheme') : t('useDarkTheme');

  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        aria-pressed={isDark}
        onClick={handleToggle}
        sx={{
          position: 'relative',
          width: 42,
          height: 42,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          bgcolor: 'transparent',
          color: isDark ? 'secondary.main' : 'text.secondary',
          transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease',
          '&:hover': {
            bgcolor: 'var(--fc-page-hover)',
            borderColor: 'text.secondary',
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            outline: '3px solid rgba(200, 241, 105, 0.7)',
            outlineOffset: 3,
          },
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
        }}>
        <LightModeRoundedIcon
          className="theme-switcher-icon"
          sx={{
            position: 'absolute',
            fontSize: 21,
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(90deg) scale(0.65)' : 'rotate(0deg) scale(1)',
            transition: 'opacity 180ms ease, transform 220ms ease',
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          }}
        />
        <DarkModeRoundedIcon
          className="theme-switcher-icon"
          sx={{
            position: 'absolute',
            fontSize: 20,
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.65)',
            transition: 'opacity 180ms ease, transform 220ms ease',
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
