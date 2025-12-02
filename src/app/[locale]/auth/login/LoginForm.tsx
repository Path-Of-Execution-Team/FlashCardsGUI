'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormField from '@/components/FormField';
import PasswordField from '@/components/PasswordField';
import AuthFormCard from '@/layouts/AuthFormCard';
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
    <AuthFormCard
      title={t('appName')}
      subtitle={t('login.welcomeBack')}
      onSubmit={handleSubmit(onSubmit)}
      linkHref={`/${locale}/auth/register`}
      linkText={t('login.noAccountRegister')}
      serverError={serverError}
      isSubmitting={isSubmitting}
      submitButtonText={t('login.signIn')}
      isSubmittingText={t('login.signingIn')}>
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
    </AuthFormCard>
  );
}
