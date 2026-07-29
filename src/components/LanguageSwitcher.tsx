'use client';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import Button from '@mui/material/Button';
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

  return (
    <>
      <Button
        aria-controls={open ? 'languages-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label={`Current language: ${locale.toUpperCase()}`}
        onClick={handleClick}
        variant="outlined"
        startIcon={<TranslateRoundedIcon sx={{ fontSize: 18 }} />}
        endIcon={<ExpandMoreRoundedIcon sx={{ fontSize: 17 }} />}
        sx={{
          minWidth: 0,
          minHeight: 42,
          px: 1.25,
          borderColor: 'divider',
          borderRadius: '12px',
          bgcolor: 'transparent',
          color: 'text.secondary',
          '&:hover': {
            borderColor: 'text.secondary',
            bgcolor: 'var(--fc-page-hover)',
            transform: 'translateY(-1px)',
          },
          '& .MuiButton-startIcon': { mr: { xs: 0, sm: 0.5 } },
          '& .MuiButton-endIcon': { display: { xs: 'none', sm: 'inherit' }, ml: 0 },
        }}>
        <span style={{ display: 'inline-block', minWidth: 20 }}>{locale.toUpperCase()}</span>
      </Button>
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
          <MenuItem key={i} onClick={() => handleSwitchLanguage(l)} selected={l === locale} sx={{ minWidth: 132, gap: 1.25 }}>
            <Image src={`/images/flags/${l}.png`} alt="" width={24} height={24} style={{ borderRadius: '50%' }} />
            {l.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
