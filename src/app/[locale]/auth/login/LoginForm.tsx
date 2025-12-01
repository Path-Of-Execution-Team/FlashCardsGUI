'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormField from '@/components/FormField';
import GradientButton from '@/components/GradientButton';
import PasswordField from '@/components/PasswordField';
import apiClient, { setAuthToken } from '@/lib/apiClient';

const loginSchema = z.object({
  login: z.string().min(1, 'login.errors.loginRequired'),
  password: z.string().min(6, 'login.errors.passwordMin'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      const token = response.data;

      setAuthToken(token);
      router.push(`/${locale}`);
    } catch (e) {
      const err = e as { response?: { status?: number } };

      const status = err.response?.status;

      if (status === 401 || status === 403) {
        setServerError(t('errors.invalidCredentials'));
        return;
      }

      if (status && status >= 500) {
        setServerError(t('errors.serverError'));
        return;
      }

      setServerError(t('errors.unknownError'));
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormField
            id="login"
            dataTestId="login-input"
            label={t('fields.login')}
            autoComplete="username"
            errors={errors.login}
            fieldName="login"
            register={register}
          />

          <PasswordField
            id="password"
            dataTestId="password-input"
            autoComplete="current-password"
            label={t('fields.password')}
            fieldName="password"
            register={register}
            errors={errors.password}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <GradientButton
            data-testid="login-submit"
            type="submit"
            disabled={isSubmitting}
            from="#FE6B8B"
            to="#FF8E53"
            shadowColor="rgba(254, 124, 111, 0.7)">
            {isSubmitting ? t('login.signingIn') : t('login.signIn')}
          </GradientButton>
        </Box>
        <Link href={`/${locale}/auth/register`} variant="body2" sx={{ display: 'block', marginTop: 2, textAlign: 'center' }}>
          {t('login.noAccountRegister')}
        </Link>
      </CardContent>
    </Card>
  );
}
