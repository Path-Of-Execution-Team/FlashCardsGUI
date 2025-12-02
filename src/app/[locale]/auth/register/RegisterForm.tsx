'use client';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormField from '@/components/FormField';
import PasswordField from '@/components/PasswordField';
import AuthFormCard from '@/layouts/AuthFormCard';
import apiClient, { setAuthToken } from '@/lib/apiClient';
import { ApiErrorResponse } from '@/types/app.types';

const registerSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/, 'register.errors.usernameInvalid')
      .max(16, 'register.errors.usernameMax')
      .min(4, 'register.errors.usernameRequired'),
    email: z.email('register.errors.invalidEmail'),
    confirmEmail: z.email('register.errors.invalidEmail'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/, 'register.errors.passwordWeak'),
    confirmPassword: z.string().min(1, 'register.errors.passwordMin'),
    agreeToTerms: z.boolean().refine(val => val === true, 'register.errors.agreeToTerms'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'register.errors.passwordsDoNotMatch',
    path: ['confirmPassword'],
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'register.errors.emailsDoNotMatch',
    path: ['confirmEmail'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    setError,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0];
        if (
          field === 'username' ||
          field === 'email' ||
          field === 'confirmEmail' ||
          field === 'password' ||
          field === 'confirmPassword' ||
          field === 'agreeToTerms'
        ) {
          setError(field, { type: 'manual', message: t(issue.message as string) });
        }
      });
      return;
    }

    setServerError(null);

    try {
      await apiClient.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setAuthToken(null);
      router.push(`/${locale}/auth/login`);
    } catch (e) {
      const err = e as { response?: { status?: number; data: { errors?: ApiErrorResponse[] } } };

      const status = err.response?.status;
      const errors = err.response?.data.errors;

      if (status && status >= 500) {
        setServerError(t('errors.serverError'));
        return;
      }

      if (errors) {
        errors.forEach(error => {
          setError(error.field as keyof RegisterFormValues, { type: 'manual', message: error.message });
        });
      }
    }
  };

  return (
    <AuthFormCard
      title={t('appName')}
      subtitle={t('register.createAccount')}
      onSubmit={handleSubmit(onSubmit)}
      linkHref={`/${locale}/auth/login`}
      linkText={t('register.alreadyHaveAccountLogin')}
      serverError={serverError}
      isSubmitting={isSubmitting}
      submitButtonText={t('register.signUp')}
      isSubmittingText={t('register.signingUp')}>
      <FormField
        id="username"
        dataTestId="register-username"
        label={t('fields.username')}
        autoComplete="username"
        errors={errors.username}
        fieldName="username"
        register={register}
      />

      <FormField
        id="email"
        dataTestId="register-email"
        label={t('fields.email')}
        autoComplete="email"
        errors={errors.email}
        fieldName="email"
        register={register}
      />

      <FormField
        id="confirmEmail"
        dataTestId="register-confirm-email"
        label={t('fields.confirmEmail')}
        autoComplete="email"
        errors={errors.confirmEmail}
        fieldName="confirmEmail"
        register={register}
      />

      <PasswordField
        id="password"
        dataTestId="password-input"
        autoComplete="new-password"
        label={t('fields.password')}
        fieldName="password"
        register={register}
        errors={errors.password}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        watch={watch}
        strengthMeter
        isDirty={!!dirtyFields.password}
      />

      <PasswordField
        id="confirmPassword"
        dataTestId="confirm-password-input"
        autoComplete="new-password"
        label={t('fields.confirmPassword')}
        fieldName="confirmPassword"
        register={register}
        errors={errors.confirmPassword}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      />

      <FormControl error={!!errors.agreeToTerms} sx={{ gap: 0 }}>
        <FormControlLabel
          control={<Checkbox size="large" />}
          label={
            <Link data-testid="terms-link" href={`/${locale}/auth/terms`}>
              {t('fields.agreeToTerms')}
            </Link>
          }
          {...register('agreeToTerms')}
        />
        {errors.agreeToTerms && <FormHelperText error={true}>{errors.agreeToTerms.message}</FormHelperText>}
      </FormControl>
    </AuthFormCard>
  );
};
export default RegisterForm;
