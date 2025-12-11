'use client';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FieldError } from 'react-hook-form';

type FormFieldFieldProps = {
  id: string;
  dataTestId: string;
  label: string;
  autoComplete: string;
  errors?: FieldError;
  fieldName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
};

const FormField = ({ id, dataTestId, label, autoComplete, errors, fieldName, register }: FormFieldFieldProps) => {
  return (
    <FormControl error={!!errors}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput id={id} data-testid={dataTestId} autoComplete={autoComplete} {...register(fieldName)} label={label} />
      {errors && <FormHelperText error={true}>{errors.message}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
