import { render, screen } from '@testing-library/react';
import React from 'react';

import CustomButton from '@/components/CustomButton';

describe('CustomButton', () => {
  it('renders with correct text', () => {
    render(<CustomButton>Click me</CustomButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
