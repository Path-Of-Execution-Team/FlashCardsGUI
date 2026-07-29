'use client';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const Terms = () => {
  const t = useTranslations('terms');

  const sections = [
    { title: t('accountTitle'), body: t('accountBody') },
    { title: t('contentTitle'), body: t('contentBody') },
    { title: t('privacyTitle'), body: t('privacyBody') },
  ];

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 7, md: 11 } }}>
      <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
        {t('eyebrow')}
      </Typography>
      <Typography component="h1" variant="h1" sx={{ mt: 1.5, fontSize: { xs: 50, md: 76 } }}>
        {t('title')}
      </Typography>
      <Typography sx={{ maxWidth: 680, mt: 3, color: 'text.secondary', fontSize: 19, lineHeight: 1.7 }}>{t('intro')}</Typography>

      <Box sx={{ mt: { xs: 7, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
        {sections.map((section, index) => (
          <Box
            key={section.title}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '80px minmax(0, 1fr)' },
              gap: { xs: 1.5, sm: 3 },
              py: 4,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}>
            <Typography sx={{ fontWeight: 800, color: 'text.secondary' }}>0{index + 1}</Typography>
            <Box>
              <Typography component="h2" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.025em' }}>
                {section.title}
              </Typography>
              <Typography sx={{ mt: 1.25, color: 'text.secondary', lineHeight: 1.75 }}>{section.body}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Button component={Link} href="/auth/register" variant="outlined" startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 5 }}>
        {t('back')}
      </Button>
    </Container>
  );
};

export default Terms;
