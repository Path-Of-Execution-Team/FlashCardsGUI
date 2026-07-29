'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import SettingsPanel from '@/components/SettingsPanel';

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1120, px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 4, md: 6 } }}>
      <Box className="workspace-reveal">
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
          {t('eyebrow')}
        </Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 0.75, fontSize: { xs: 42, md: 58 } }}>
          {t('title')}
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 660, color: 'text.secondary', fontSize: 17, lineHeight: 1.65 }}>{t('intro')}</Typography>
      </Box>

      <SettingsPanel />
    </Container>
  );
}
