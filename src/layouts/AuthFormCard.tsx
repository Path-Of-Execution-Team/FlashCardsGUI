'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import CowLogoIcon from '@/icons/CowLogoIcon';

type AuthFormCardProps = {
  mode: 'login' | 'register';
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: () => void;
  linkText: string;
  linkHref: string;
  serverError: string | null;
  isSubmitting: boolean;
  submitButtonText: string;
  isSubmittingText: string;
};

const AuthFormCard = ({
  mode,
  title,
  subtitle,
  children,
  onSubmit,
  linkText,
  linkHref,
  serverError,
  isSubmitting,
  submitButtonText,
  isSubmittingText,
}: AuthFormCardProps) => {
  const t = useTranslations();
  const isRegister = mode === 'register';

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 1120,
        mx: 'auto',
        px: { xs: 2, sm: 3 },
        py: { xs: 5, md: 8 },
      }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 0.82fr) minmax(0, 1.18fr)' },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: 'var(--fc-card-shadow)',
        }}>
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 300, md: isRegister ? 820 : 640 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            bgcolor: 'var(--fc-brand-surface)',
            color: 'var(--fc-brand-on)',
            p: { xs: 3, sm: 4, md: 5 },
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 320,
              height: 320,
              right: -190,
              bottom: -170,
              border: '1px solid var(--fc-brand-border)',
              borderRadius: '50%',
            },
          }}>
          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 2,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                transform: 'rotate(-4deg)',
              }}>
              <CowLogoIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.045em' }}>{title}</Typography>
          </Box>

          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 380, my: { xs: 6, md: 0 } }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.12em' }}>
              {t(`auth.${mode}.eyebrow`)}
            </Typography>
            <Typography component="p" variant="h3" sx={{ mt: 1.5, fontSize: { xs: 38, md: 48 } }}>
              {t(`auth.${mode}.title`)}
            </Typography>
            <Typography sx={{ mt: 2, color: 'var(--fc-brand-on-muted)', lineHeight: 1.65 }}>{t(`auth.${mode}.description`)}</Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1.5,
              pt: 2.5,
              borderTop: '1px solid var(--fc-brand-border)',
            }}>
            <AutoStoriesRoundedIcon sx={{ color: 'secondary.main' }} />
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'var(--fc-brand-on-muted)' }}>
                {t('auth.asideLabel')}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {t('auth.asideValue')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 3, sm: 5, md: 7 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.11em' }}>
              {t(`auth.${mode}.formEyebrow`)}
            </Typography>
            <Typography component="h1" variant="h3" sx={{ mt: 1, fontSize: { xs: 34, md: 42 } }}>
              {subtitle}
            </Typography>
          </Box>

          <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
            {children}

            {serverError && (
              <Alert severity="error" variant="outlined">
                {serverError}
              </Alert>
            )}

            <Button
              data-testid="submit-button"
              type="submit"
              disabled={isSubmitting}
              fullWidth
              endIcon={!isSubmitting && <ArrowForwardRoundedIcon />}
              sx={{ minHeight: 56, mt: 0.5, '&:hover': { bgcolor: 'var(--fc-action-hover)' } }}>
              {isSubmitting ? isSubmittingText : submitButtonText}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link
              href={linkHref}
              variant="body2"
              underline="hover"
              data-testid="another-action-link"
              sx={{ color: 'text.secondary', fontWeight: 600, textUnderlineOffset: 4 }}>
              {linkText}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthFormCard;
