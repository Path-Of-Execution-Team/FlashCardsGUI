'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const stepKeys = ['capture', 'practice', 'remember'] as const;

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: 'calc(100svh - 72px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: { xs: 340, md: 620 },
            height: { xs: 340, md: 620 },
            right: { xs: -220, md: -260 },
            top: { xs: 70, md: -220 },
            border: '1px solid var(--fc-page-outline-soft)',
            borderRadius: '50%',
          },
        }}>
        <Container maxWidth={false} sx={{ maxWidth: 1320, px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 8, md: 6 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.02fr) minmax(440px, 0.98fr)' },
              gap: { xs: 8, md: 5, lg: 9 },
              alignItems: 'center',
            }}>
            <Box sx={{ maxWidth: 680 }}>
              <Box className="hero-reveal" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 3 }}>
                <Box className="session-dot" sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em', lineHeight: 1.2 }}>
                  {t('home.hero.eyebrow')}
                </Typography>
              </Box>

              <Typography
                component="h1"
                variant="h1"
                className="hero-reveal hero-reveal--2"
                sx={{ maxWidth: 700, fontSize: { xs: 'clamp(3.25rem, 15vw, 5rem)', md: 'clamp(4.6rem, 7vw, 7.1rem)' } }}>
                {t('home.hero.title')}
              </Typography>

              <Typography
                className="hero-reveal hero-reveal--3"
                sx={{
                  maxWidth: 560,
                  mt: 3,
                  color: 'text.secondary',
                  fontSize: { xs: 18, md: 20 },
                  lineHeight: 1.6,
                }}>
                {t('home.hero.description')}
              </Typography>

              <Stack
                className="hero-reveal hero-reveal--4"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ mt: 4.5, alignItems: { sm: 'center' } }}>
                <Button
                  component={Link}
                  href="/auth/register"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ minHeight: 56, px: 3, '&:hover': { bgcolor: 'var(--fc-action-hover)' } }}>
                  {t('home.hero.primaryCta')}
                </Button>
                <Button
                  component={Link}
                  href="/auth/login"
                  size="large"
                  variant="outlined"
                  sx={{
                    minHeight: 56,
                    px: 3,
                    color: 'text.primary',
                    borderColor: 'var(--fc-page-outline)',
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'var(--fc-page-hover)' },
                  }}>
                  {t('home.hero.secondaryCta')}
                </Button>
              </Stack>

              <Box className="hero-reveal hero-reveal--4" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mt: 4 }}>
                {[t('home.hero.proofOne'), t('home.hero.proofTwo')].map(proof => (
                  <Box key={proof} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        bgcolor: 'var(--fc-accent-soft)',
                        color: 'secondary.contrastText',
                      }}>
                      <CheckRoundedIcon sx={{ fontSize: 15 }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {proof}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              className="flashcard-stage"
              role="img"
              aria-label={t('home.preview.ariaLabel')}
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 570,
                minHeight: { xs: 470, sm: 560 },
                justifySelf: 'center',
                display: 'grid',
                placeItems: 'center',
                borderRadius: { xs: 4, md: 6 },
                bgcolor: 'var(--fc-brand-surface)',
                overflow: 'hidden',
                boxShadow: 'var(--fc-stage-shadow)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(var(--fc-brand-grid) 1px, transparent 1px), linear-gradient(90deg, var(--fc-brand-grid) 1px, transparent 1px)',
                  backgroundSize: '42px 42px',
                  maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
                },
              }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 24, sm: 30 },
                  left: { xs: 24, sm: 32 },
                  right: { xs: 24, sm: 32 },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--fc-brand-on-strong)',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BoltRoundedIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {t('home.preview.session')}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ letterSpacing: '0.08em' }}>
                  {t('home.preview.progress')}
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', width: '76%', maxWidth: 390, height: { xs: 320, sm: 360 }, mt: 4 }}>
                <Box
                  className="flashcard-shadow-two"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 3,
                    border: '1px solid var(--fc-brand-border)',
                    bgcolor: 'var(--fc-brand-surface-muted)',
                  }}
                />
                <Box
                  className="flashcard-shadow-one"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 3,
                    border: '1px solid var(--fc-page-outline-soft)',
                    bgcolor: 'secondary.main',
                  }}
                />
                <Box
                  className="flashcard-primary"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    p: { xs: 3, sm: 4 },
                    boxShadow: '0 22px 55px rgba(0,0,0,0.22)',
                  }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.1em' }}>
                      {t('home.preview.category')}
                    </Typography>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  </Box>
                  <Typography
                    sx={{
                      mt: 'auto',
                      mb: 'auto',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 700,
                      fontSize: { xs: 30, sm: 38 },
                      lineHeight: 1.12,
                      letterSpacing: '-0.035em',
                    }}>
                    {t('home.preview.question')}
                  </Typography>
                  <Box sx={{ pt: 2.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('home.preview.hint')}
                    </Typography>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 22, sm: 30 },
                  left: { xs: 24, sm: 32 },
                  right: { xs: 24, sm: 32 },
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'var(--fc-brand-on-muted)',
                }}>
                <Typography variant="caption">{t('home.preview.queue')}</Typography>
                <Typography variant="caption">{t('home.preview.time')}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" id="how-it-works" sx={{ py: { xs: 10, md: 16 }, scrollMarginTop: 90 }}>
        <Container maxWidth={false} sx={{ maxWidth: 1320, px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box sx={{ maxWidth: 760, mb: { xs: 7, md: 10 } }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
              {t('home.steps.eyebrow')}
            </Typography>
            <Typography component="h2" variant="h2" sx={{ mt: 1.5, fontSize: { xs: 44, md: 66 } }}>
              {t('home.steps.title')}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            {stepKeys.map((step, index) => (
              <Box
                key={step}
                sx={{
                  py: { xs: 4, md: 1 },
                  pr: { md: index < 2 ? 5 : 0 },
                  pl: { md: index > 0 ? 5 : 0 },
                  borderTop: { xs: '1px solid', md: 0 },
                  borderLeft: { md: index > 0 ? '1px solid' : 0 },
                  borderColor: 'divider',
                }}>
                <Typography sx={{ color: 'var(--fc-step-index)', fontWeight: 800, fontSize: 14, mb: 5 }}>0{index + 1}</Typography>
                <Typography component="h3" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mb: 1.5 }}>
                  {t(`home.steps.${step}.title`)}
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 320 }}>{t(`home.steps.${step}.description`)}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container
        component="section"
        id="method"
        maxWidth={false}
        sx={{ maxWidth: 1320, px: { xs: 2, sm: 3, lg: 4 }, pb: { xs: 10, md: 16 }, scrollMarginTop: 90 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
            gap: { xs: 7, md: 12 },
            alignItems: 'center',
            bgcolor: 'var(--fc-brand-surface)',
            color: 'var(--fc-brand-on)',
            borderRadius: { xs: 3, md: 5 },
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 7, md: 9 },
            overflow: 'hidden',
            position: 'relative',
          }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.12em' }}>
              {t('home.method.eyebrow')}
            </Typography>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: 43, md: 60 }, mt: 1.5 }}>
              {t('home.method.title')}
            </Typography>
            <Typography sx={{ mt: 2.5, color: 'var(--fc-brand-on-muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 470 }}>
              {t('home.method.description')}
            </Typography>
          </Box>

          <Box sx={{ borderTop: '1px solid var(--fc-brand-border)' }}>
            {[
              { icon: <ScheduleRoundedIcon />, label: t('home.method.review'), value: t('home.method.reviewValue') },
              { icon: <AutoStoriesRoundedIcon />, label: t('home.method.decks'), value: t('home.method.decksValue') },
              { icon: <BoltRoundedIcon />, label: t('home.method.streak'), value: t('home.method.streakValue') },
            ].map(item => (
              <Box
                key={item.label}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr auto',
                  alignItems: 'center',
                  gap: 2,
                  py: 2.5,
                  borderBottom: '1px solid var(--fc-brand-border)',
                }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 2,
                    bgcolor: 'var(--fc-brand-border)',
                  }}>
                  {item.icon}
                </Box>
                <Typography sx={{ color: 'var(--fc-brand-on-strong)' }}>{item.label}</Typography>
                <Typography sx={{ fontWeight: 800, textAlign: 'right' }}>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Box component="section" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: { xs: 9, md: 12 } }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1120,
            px: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
          }}>
          <Box sx={{ maxWidth: 720 }}>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: 44, md: 64 } }}>
              {t('home.finalCta.title')}
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(23,37,28,0.7)', fontSize: 18 }}>{t('home.finalCta.description')}</Typography>
          </Box>
          <Button
            component={Link}
            href="/auth/register"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              minHeight: 58,
              px: 3.5,
              flexShrink: 0,
              bgcolor: 'var(--fc-brand-surface)',
              color: 'var(--fc-brand-on)',
              '&:hover': { bgcolor: 'var(--fc-brand-surface-hover)' },
            }}>
            {t('home.finalCta.button')}
          </Button>
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: 'var(--fc-brand-surface)', color: 'var(--fc-brand-on-muted)', py: 3 }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1320,
            px: { xs: 2, sm: 3, lg: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} {t('appName')}
          </Typography>
          <Typography variant="body2">{t('home.footer.note')}</Typography>
        </Container>
      </Box>
    </>
  );
}
