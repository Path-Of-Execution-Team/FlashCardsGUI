'use client';

import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}) as typeof Button;

export default CustomButton;
