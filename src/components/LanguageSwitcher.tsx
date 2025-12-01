'use client';

import TranslateIcon from '@mui/icons-material/Translate';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchLanguage = (locale: string) => {
    setAnchorEl(null);

    const newPath = `/${locale}${pathname}`;
    router.push(newPath);
  };

  const getCountryCode = (locale: string) => {
    if (locale === 'en') return 'US';
    return locale.toUpperCase();
  };

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <IconButton
        aria-controls={open ? 'languages-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
        sx={{ color: '#fff' }}>
        <TranslateIcon />
      </IconButton>
      <Menu
        id="languages-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}>
        {routing.locales.map((l, i) => (
          <MenuItem key={i} onClick={() => handleSwitchLanguage(l)} disabled={l === locale}>
            <Image
              src={`https://flagsapi.com/${getCountryCode(l)}/flat/32.png`}
              alt={l.toUpperCase()}
              width={32}
              height={32}
              style={{ marginRight: '0.5rem' }}
            />
            {l.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
