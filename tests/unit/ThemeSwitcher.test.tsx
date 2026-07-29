import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThemeSwitcher from '@/components/ThemeSwitcher';

const colorScheme = vi.hoisted(() => ({
  mode: 'light' as 'light' | 'dark' | 'system' | undefined,
  setMode: vi.fn(),
  systemMode: 'light' as 'light' | 'dark' | undefined,
}));

vi.mock('@mui/material/styles', async importOriginal => {
  const actual = await importOriginal<typeof import('@mui/material/styles')>();

  return {
    ...actual,
    useColorScheme: () => colorScheme,
  };
});

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    colorScheme.mode = 'light';
    colorScheme.systemMode = 'light';
  });

  it('switches from the light theme to the dark theme', () => {
    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByRole('button', { name: 'useDarkTheme' }));

    expect(colorScheme.setMode).toHaveBeenCalledWith('dark');
  });

  it('resolves the system preference before switching themes', () => {
    colorScheme.mode = 'system';
    colorScheme.systemMode = 'dark';

    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByRole('button', { name: 'useLightTheme' }));

    expect(colorScheme.setMode).toHaveBeenCalledWith('light');
  });
});
