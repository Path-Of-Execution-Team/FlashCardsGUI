import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { routing } from '@/i18n/routing';

describe('LanguageSwitcher', () => {
  it('should shows a list of available languages', () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    routing.locales.forEach(loc => {
      expect(screen.getByText(loc.toUpperCase())).toBeInTheDocument();
    });
  });
});
