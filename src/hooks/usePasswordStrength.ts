import { useEffect, useState } from 'react';

type StrengthLabel =
  | 'passwordStrength.veryWeak'
  | 'passwordStrength.weak'
  | 'passwordStrength.medium'
  | 'passwordStrength.strong'
  | 'passwordStrength.veryStrong';
type StrengthColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface PasswordStrength {
  percentage: number;
  label: StrengthLabel;
  color: StrengthColor;
}

export const usePasswordStrength = (password: string): PasswordStrength => {
  const [strength, setStrength] = useState<PasswordStrength>({
    percentage: 0,
    label: 'passwordStrength.veryWeak',
    color: 'error',
  });

  useEffect(() => {
    setStrength(calculatePasswordStrength(password));
  }, [password]);

  return strength;
};

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      percentage: 0,
      label: 'passwordStrength.veryWeak',
      color: 'error',
    };
  }

  let score = 0;
  const length = password.length;

  if (length >= 8) score += 30;
  if (length >= 12) score += 20;
  if (length >= 16) score += 10;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  score += varietyCount * 10;

  if (length < 6) {
    score = Math.min(score, 30);
  }

  const uniqueChars = new Set(password).size;
  if (uniqueChars <= Math.floor(length / 2)) {
    score -= 10;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return {
    percentage: score,
    label: getLabelFromScore(score),
    color: getColorFromScore(score),
  };
};

const getColorFromScore = (score: number): StrengthColor => {
  if (score < 20) return 'error';
  if (score < 40) return 'warning';
  if (score < 60) return 'info';
  if (score < 80) return 'primary';
  return 'success';
};

const getLabelFromScore = (score: number): StrengthLabel => {
  if (score < 20) return 'passwordStrength.veryWeak';
  if (score < 40) return 'passwordStrength.weak';
  if (score < 60) return 'passwordStrength.medium';
  if (score < 80) return 'passwordStrength.strong';
  return 'passwordStrength.veryStrong';
};
