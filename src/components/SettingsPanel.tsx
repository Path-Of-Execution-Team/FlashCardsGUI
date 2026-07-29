'use client';

import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import ThemeSwitcher from './ThemeSwitcher';

const sectionLinks = [
  { key: 'profile', icon: PersonRoundedIcon },
  { key: 'study', icon: SchoolRoundedIcon },
  { key: 'appearance', icon: PaletteRoundedIcon },
  { key: 'notifications', icon: NotificationsActiveRoundedIcon },
] as const;

const SettingsPanel = () => {
  const t = useTranslations('settings');
  const [dailyGoal, setDailyGoal] = useState('18');
  const [reminderTime, setReminderTime] = useState('18:00');
  const [emailReminders, setEmailReminders] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <Box
      className="workspace-reveal workspace-reveal--2"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '210px minmax(0, 1fr)' },
        gap: { xs: 5, md: 8 },
        mt: { xs: 6, md: 8 },
      }}>
      <Box component="nav" aria-label={t('sectionNavigation')} sx={{ alignSelf: 'start', position: { md: 'sticky' }, top: { md: 100 } }}>
        <Box sx={{ display: { xs: 'flex', md: 'grid' }, gap: 0.5, overflowX: 'auto', pb: { xs: 1, md: 0 } }}>
          {sectionLinks.map(item => {
            const Icon = item.icon;

            return (
              <Button
                key={item.key}
                component="a"
                href={`#${item.key}`}
                variant="text"
                startIcon={<Icon />}
                sx={{
                  justifyContent: 'flex-start',
                  flexShrink: 0,
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'var(--fc-page-hover)', color: 'text.primary', transform: 'none' },
                }}>
                {t(`sections.${item.key}`)}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box>
        <Box component="section" id="profile" sx={{ scrollMarginTop: 100, borderTop: '1px solid', borderColor: 'divider', pt: 3.5, pb: 6 }}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            {t('profile.title')}
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.6 }}>{t('profile.description')}</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3.5 }}>
            <TextField label={t('profile.name')} defaultValue={t('profile.mockName')} />
            <TextField label={t('profile.email')} defaultValue={t('profile.mockEmail')} type="email" />
          </Box>
        </Box>

        <Box component="section" id="study" sx={{ scrollMarginTop: 100, borderTop: '1px solid', borderColor: 'divider', pt: 3.5, pb: 6 }}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            {t('study.title')}
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.6 }}>{t('study.description')}</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3.5 }}>
            <TextField
              select
              label={t('study.dailyGoal')}
              value={dailyGoal}
              onChange={event => {
                setDailyGoal(event.target.value);
                setSaved(false);
              }}>
              {['10', '18', '25', '40'].map(value => (
                <MenuItem key={value} value={value}>
                  {t('study.cardsPerDay', { count: Number(value) })}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label={t('study.reminderTime')}
              value={reminderTime}
              onChange={event => {
                setReminderTime(event.target.value);
                setSaved(false);
              }}>
              {['08:00', '12:00', '18:00', '21:00'].map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box component="section" id="appearance" sx={{ scrollMarginTop: 100, borderTop: '1px solid', borderColor: 'divider', pt: 3.5, pb: 6 }}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            {t('appearance.title')}
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.6 }}>{t('appearance.description')}</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
              mt: 3.5,
              py: 2.5,
            }}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{t('appearance.theme')}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {t('appearance.themeHint')}
              </Typography>
            </Box>
            <ThemeSwitcher />
          </Box>
        </Box>

        <Box component="section" id="notifications" sx={{ scrollMarginTop: 100, borderTop: '1px solid', borderColor: 'divider', pt: 3.5, pb: 5 }}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            {t('notifications.title')}
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.6 }}>{t('notifications.description')}</Typography>

          <Box sx={{ display: 'grid', mt: 2.5 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailReminders}
                  onChange={event => {
                    setEmailReminders(event.target.checked);
                    setSaved(false);
                  }}
                />
              }
              label={t('notifications.email')}
              sx={{ py: 1, m: 0, justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={streakReminders}
                  onChange={event => {
                    setStreakReminders(event.target.checked);
                    setSaved(false);
                  }}
                />
              }
              label={t('notifications.streak')}
              sx={{ py: 1, m: 0, justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: 2 }}>
          <Button onClick={handleSave} data-testid="save-mock-settings" sx={{ minWidth: 170 }}>
            {t('save')}
          </Button>
          {saved && (
            <Alert severity="success" variant="outlined" sx={{ py: 0 }}>
              {t('saved')}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPanel;
