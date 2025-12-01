import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';

import GradientButton from '@/components/GradientButton';

export default async function Login() {
  const t = await getTranslations();

  return (
    <Card
      sx={{
        width: { xs: '100%', md: '40%' },
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Typography variant="h4" component="h2" sx={{ paddingTop: 3, textAlign: 'center' }}>
        {t('appName')}
      </Typography>
      <Typography variant="subtitle2" component="h3" sx={{ paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>
        {t('login.welcomeBack')}
      </Typography>
      <CardContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField id="login" label={t('login.login')} autoComplete="username" />
          <TextField id="password" label={t('login.password')} type="password" autoComplete="current-password" />
          <GradientButton from="#FE6B8B" to="#FF8E53" shadowColor="rgba(254, 124, 111, 0.7)">
            {t('login.signIn')}
          </GradientButton>
        </Box>
      </CardContent>
    </Card>
  );
}
