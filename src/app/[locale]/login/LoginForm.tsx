'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import GradientButton from '@/components/GradientButton';
import apiClient from '@/lib/apiClient';

const loginSchema = z.object({
  login: z.string().min(1, 'login.errors.loginRequired'),
  password: z.string().min(6, 'login.errors.passwordMin'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const t = useTranslations();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0];
        if (field === 'login' || field === 'password') {
          setError(field, { type: 'manual', message: t(issue.message as string) });
        }
      });
      return;
    }

    setServerError(null);

    try {
      const response = await apiClient.post('/auth/login', {
        identifier: data.login,
        password: data.password,
      });

      console.log('Zalogowano!', response.data);
    } catch (e) {
      const err = e as Error;

      if (err.message.includes('403')) {
        setServerError(t('login.errors.invalidCredentials'));
        return;
      } else if (err.message.includes('500')) {
        setServerError(t('login.errors.serverError'));
        return;
      } else {
        setServerError(t('login.errors.unknownError'));
      }

      setServerError(err.message);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', md: '40%' },
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backdropFilter: 'blur(10px)',
      }}>
      <Typography variant="h4" component="h2" sx={{ pt: 3, textAlign: 'center' }}>
        {t('appName')}
      </Typography>

      <Typography variant="subtitle2" component="h3" sx={{ pt: 1, pb: 1, textAlign: 'center' }}>
        {t('login.welcomeBack')}
      </Typography>

      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            id="login"
            label={t('login.login')}
            autoComplete="username"
            {...register('login')}
            error={!!errors.login}
            helperText={errors.login?.message}
          />

          <TextField
            id="password"
            label={t('login.password')}
            type="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <GradientButton
            type="submit"
            disabled={isSubmitting}
            from="#FE6B8B"
            to="#FF8E53"
            shadowColor="rgba(254, 124, 111, 0.7)"
            sx={{ marginTop: 1 }}>
            {isSubmitting ? t('login.signingIn') : t('login.signIn')}
          </GradientButton>
        </Box>
      </CardContent>
    </Card>
  );
}
