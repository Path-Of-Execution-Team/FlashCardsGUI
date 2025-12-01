import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LoginForm from '@/app/[locale]/login/LoginForm';
import apiClient, * as apiClientModule from '@/lib/apiClient';

describe('LoginForm', () => {
  const postSpy = vi.spyOn(apiClient, 'post');
  const setAuthTokenSpy = vi.spyOn(apiClientModule, 'setAuthToken');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should shows validation errors when the form is empty', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'login.signIn' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('login.errors.loginRequired')).toBeInTheDocument();
    expect(await screen.findByText('login.errors.passwordMin')).toBeInTheDocument();
  });

  it('should sends correct data to the API and saves the token', async () => {
    postSpy.mockResolvedValueOnce({ data: 'FAKE_JWT' });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('login.login'), {
      target: { value: 'Puszmen12' },
    });
    fireEvent.change(screen.getByLabelText('login.password'), {
      target: { value: 'zaq1@WSX' },
    });

    const submitButton = screen.getByRole('button', { name: 'login.signIn' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith('/auth/login', {
        identifier: 'Puszmen12',
        password: 'zaq1@WSX',
      });
    });

    expect(setAuthTokenSpy).toHaveBeenCalledWith('FAKE_JWT');
  });

  it('should shows a message about incorrect login details', async () => {
    postSpy.mockRejectedValueOnce({
      response: { status: 403 },
    } as unknown);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('login.login'), {
      target: { value: 'zlyUser' },
    });
    fireEvent.change(screen.getByLabelText('login.password'), {
      target: { value: 'zleHaslo' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'login.signIn' }));

    expect(await screen.findByText('login.errors.invalidCredentials')).toBeInTheDocument();
  });
});
