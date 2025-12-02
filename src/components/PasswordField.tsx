'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FieldError } from 'react-hook-form';

import { usePasswordStrength } from '@/hooks/usePasswordStrength';

import LinearProgressWithLabel from './LinearProgressWithLabel';

type BasePasswordFieldProps = {
  id: string;
  dataTestId: string;
  label: string;
  autoComplete: string;
  errors?: FieldError;
  fieldName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type PasswordFieldWithMeterProps = BasePasswordFieldProps & {
  strengthMeter: true;
  watch: (fieldName: string) => string;
  isDirty: boolean;
};

type PasswordFieldWithoutMeterProps = BasePasswordFieldProps & {
  strengthMeter?: false;
  watch?: undefined;
  isDirty?: undefined;
};

type PasswordFieldProps = PasswordFieldWithMeterProps | PasswordFieldWithoutMeterProps;

const PasswordField = ({
  id,
  dataTestId,
  label,
  autoComplete,
  errors,
  fieldName,
  register,
  isVisible,
  setIsVisible,
  watch,
  strengthMeter,
  isDirty,
}: PasswordFieldProps) => {
  if (strengthMeter && !watch) {
    throw new Error('watch function is required when strengthMeter is enabled');
  }

  if (isDirty === undefined && strengthMeter) {
    throw new Error('isDirty prop is required when strengthMeter is enabled');
  }

  const password = strengthMeter && watch ? ((watch(fieldName) as string | undefined) ?? '') : '';
  const { percentage, label: strengthLabel, color } = usePasswordStrength(password);

  return (
    <FormControl error={!!errors}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        data-testid={dataTestId}
        autoComplete={autoComplete}
        {...register(fieldName)}
        type={isVisible ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={isVisible ? 'hide the password' : 'display the password'}
              onClick={() => setIsVisible(!isVisible)}
              onMouseDown={e => e.preventDefault()}
              onMouseUp={e => e.preventDefault()}
              edge="end">
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {strengthMeter && isDirty && <LinearProgressWithLabel value={percentage} strength={strengthLabel} color={color} />}
      {errors && <FormHelperText error={true}>{errors.message}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
