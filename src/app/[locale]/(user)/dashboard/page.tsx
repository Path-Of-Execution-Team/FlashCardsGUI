'use client';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const deckData = [
  { key: 'biology', cards: 72, due: 18, progress: 64 },
  { key: 'english', cards: 124, due: 9, progress: 78 },
  { key: 'history', cards: 56, due: 0, progress: 42 },
] as const;

const activityKeys = ['biologyReview', 'englishCards', 'streak'] as const;

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [demoNoticeOpen, setDemoNoticeOpen] = useState(false);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1320, px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 4, md: 6 } }}>
      <Box className="workspace-reveal">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            justifyContent: 'space-between',
            gap: 3,
          }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
              {t('eyebrow')}
            </Typography>
            <Typography component="h1" variant="h2" sx={{ mt: 0.75, fontSize: { xs: 42, md: 58 } }}>
              {t('title')}
            </Typography>
            <Typography sx={{ mt: 1.5, color: 'text.secondary', fontSize: 17 }}>{t('intro')}</Typography>
          </Box>
          <Button
            onClick={() => setDemoNoticeOpen(true)}
            startIcon={<AddRoundedIcon />}
            variant="outlined"
            sx={{ minHeight: 46, color: 'text.primary', borderColor: 'divider' }}>
            {t('newDeck')}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            mt: { xs: 5, md: 7 },
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}>
          {[
            { icon: <ScheduleRoundedIcon />, value: '18', label: t('stats.due') },
            { icon: <AutoStoriesRoundedIcon />, value: '4', label: t('stats.decks') },
            { icon: <BoltRoundedIcon />, value: '6', label: t('stats.streak') },
          ].map((stat, index) => (
            <Box
              key={stat.label}
              sx={{
                display: 'grid',
                gridTemplateColumns: '42px 1fr',
                columnGap: 1.5,
                py: 3,
                pl: { sm: index > 0 ? 4 : 0 },
                borderTop: { xs: index > 0 ? '1px solid' : 0, sm: 0 },
                borderLeft: { sm: index > 0 ? '1px solid' : 0 },
                borderColor: 'divider',
              }}>
              <Box sx={{ color: 'text.secondary', pt: 0.4 }}>{stat.icon}</Box>
              <Box>
                <Typography sx={{ fontSize: 31, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.045em' }}>{stat.value}</Typography>
                <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        className="workspace-reveal workspace-reveal--2"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.45fr) minmax(280px, 0.55fr)' },
          gap: { xs: 5, lg: 7 },
          mt: { xs: 6, md: 8 },
        }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
            {t('session.eyebrow')}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              mt: 1.5,
              minHeight: 310,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              borderRadius: { xs: 3, md: 4 },
              bgcolor: 'var(--fc-brand-surface)',
              color: 'var(--fc-brand-on)',
              p: { xs: 3, sm: 4.5 },
              boxShadow: 'var(--fc-stage-shadow)',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 260,
                height: 260,
                right: -120,
                top: -150,
                borderRadius: '50%',
                border: '1px solid var(--fc-brand-border)',
              },
            }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.09em' }}>
                {t('session.deck')}
              </Typography>
              <Typography component="h2" variant="h3" sx={{ mt: 1.5, maxWidth: 570, fontSize: { xs: 35, md: 45 } }}>
                {sessionStarted ? t('session.activeTitle') : t('session.title')}
              </Typography>
              <Typography sx={{ mt: 1.5, maxWidth: 550, color: 'var(--fc-brand-on-muted)', lineHeight: 1.65 }}>
                {sessionStarted ? t('session.activeDescription') : t('session.description')}
              </Typography>
            </Box>

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2.5,
                mt: 5,
              }}>
              <Button
                onClick={() => setSessionStarted(true)}
                disabled={sessionStarted}
                endIcon={sessionStarted ? <CheckCircleRoundedIcon /> : <ArrowForwardRoundedIcon />}
                sx={{
                  minWidth: 190,
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': { bgcolor: 'var(--fc-action-hover)' },
                  '&.Mui-disabled': {
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    opacity: 0.78,
                  },
                }}>
                {sessionStarted ? t('session.activeButton') : t('session.button')}
              </Button>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography variant="caption" sx={{ color: 'var(--fc-brand-on-muted)' }}>
                    {t('session.progressLabel')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--fc-brand-on)' }}>
                    2 / 18
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={11}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    bgcolor: 'var(--fc-brand-border)',
                    '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
            {t('activity.eyebrow')}
          </Typography>
          <Box sx={{ mt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
            {activityKeys.map((key, index) => (
              <Box
                key={key}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '30px 1fr',
                  gap: 1.5,
                  py: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    bgcolor: index === 0 ? 'var(--fc-accent-soft)' : 'transparent',
                    border: '1px solid',
                    borderColor: index === 0 ? 'transparent' : 'divider',
                    color: index === 0 ? 'secondary.contrastText' : 'text.secondary',
                    fontSize: 11,
                    fontWeight: 800,
                  }}>
                  {index + 1}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {t(`activity.${key}.title`)}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.4, color: 'text.secondary', lineHeight: 1.5 }}>
                    {t(`activity.${key}.meta`)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="workspace-reveal workspace-reveal--3" sx={{ mt: { xs: 7, md: 10 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.12em' }}>
              {t('decks.eyebrow')}
            </Typography>
            <Typography component="h2" variant="h4" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: '-0.035em' }}>
              {t('decks.title')}
            </Typography>
          </Box>
          <Button onClick={() => setDemoNoticeOpen(true)} variant="text" endIcon={<ArrowForwardRoundedIcon />} sx={{ color: 'text.secondary' }}>
            {t('decks.all')}
          </Button>
        </Box>

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          {deckData.map(deck => (
            <Box
              key={deck.key}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr auto', md: 'minmax(220px, 1.2fr) 120px minmax(180px, 0.8fr) 44px' },
                alignItems: 'center',
                gap: { xs: 1.5, md: 3 },
                py: 2.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 160ms ease, padding 160ms ease',
                '&:hover': {
                  bgcolor: 'var(--fc-page-hover)',
                  px: { md: 1.5 },
                },
              }}>
              <Box>
                <Typography sx={{ fontWeight: 800 }}>{t(`decks.items.${deck.key}`)}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('decks.cards', { count: deck.cards })}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: deck.due > 0 ? 'text.primary' : 'text.secondary', fontWeight: 700 }}>
                {deck.due > 0 ? t('decks.due', { count: deck.due }) : t('decks.done')}
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('decks.mastery')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {deck.progress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={deck.progress}
                  sx={{
                    height: 5,
                    borderRadius: 999,
                    bgcolor: 'var(--fc-accent-soft)',
                    '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' },
                  }}
                />
              </Box>
              <IconButton
                onClick={() => setDemoNoticeOpen(true)}
                aria-label={t('decks.more', { deck: t(`decks.items.${deck.key}`) })}
                sx={{ color: 'text.secondary' }}>
                <MoreHorizRoundedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={demoNoticeOpen}
        autoHideDuration={2600}
        onClose={() => setDemoNoticeOpen(false)}
        message={t('demoAction')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}
