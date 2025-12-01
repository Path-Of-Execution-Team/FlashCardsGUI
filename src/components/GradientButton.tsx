'use client';

import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';

type GradientButtonProps = ButtonProps & {
  from: string;
  to: string;
  shadowColor: string;
  fromPercent?: number;
  toPercent?: number;
  blackText?: boolean;
};

export const GradientButton = styled(Button, {
  shouldForwardProp: prop =>
    prop !== 'from' && prop !== 'to' && prop !== 'fromPercent' && prop !== 'toPercent' && prop !== 'shadowColor' && prop !== 'blackText',
})<GradientButtonProps>(({ from, to, shadowColor, blackText = false, fromPercent = 30, toPercent = 90 }) => ({
  background: `linear-gradient(45deg, ${from} ${fromPercent}%, ${to} ${toPercent}%)`,
  color: blackText ? '#000' : '#fff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out, background 0.15s ease-out',
  '&:hover': {
    boxShadow: `0px 0px 15px 1px ${shadowColor}`,
  },
}));

export default GradientButton;
