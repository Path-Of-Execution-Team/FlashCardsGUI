import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RegisterForm from '@/app/[locale]/auth/register/RegisterForm';
import apiClient, * as apiClientModule from '@/lib/apiClient';

describe('RegisterForm', () => {
  const postSpy = vi.spyOn(apiClient, 'post');
  const setAuthTokenSpy = vi.spyOn(apiClientModule, 'setAuthToken');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show validation errors when the form is empty', async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: 'register.signUp' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('register.errors.usernameRequired')).toBeInTheDocument();

    const emailErrors = await screen.findAllByText('register.errors.invalidEmail');
    expect(emailErrors).toHaveLength(2);

    expect(await screen.findByText('register.errors.passwordWeak')).toBeInTheDocument();

    expect(await screen.findByText('register.errors.passwordMin')).toBeInTheDocument();

    expect(await screen.findByText('register.errors.agreeToTerms')).toBeInTheDocument();
  });

  it('should send correct data to the API and clear token + go to login', async () => {
    postSpy.mockResolvedValueOnce({});

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('fields.username'), {
      target: { value: 'Puszmen12' },
    });
    fireEvent.change(screen.getByLabelText('fields.email'), {
      target: { value: 'puszmen@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmEmail'), {
      target: { value: 'puszmen@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.password'), {
      target: { value: 'Zaq1@WSX' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword'), {
      target: { value: 'Zaq1@WSX' },
    });

    fireEvent.click(screen.getByLabelText('fields.agreeToTerms'));

    const submitButton = screen.getByRole('button', { name: 'register.signUp' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith('/auth/register', {
        username: 'Puszmen12',
        email: 'puszmen@example.com',
        password: 'Zaq1@WSX',
      });
    });

    expect(setAuthTokenSpy).toHaveBeenCalledWith(null);
  });

  it('should map API validation errors to form fields', async () => {
    postSpy.mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          errors: [
            {
              field: 'username',
              message: 'register.errors.usernameTaken',
            },
          ],
        },
      },
    } as unknown);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('fields.username'), {
      target: { value: 'ExistingUser' },
    });
    fireEvent.change(screen.getByLabelText('fields.email'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmEmail'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.password'), {
      target: { value: 'Zaq1@WSX' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword'), {
      target: { value: 'Zaq1@WSX' },
    });
    fireEvent.click(screen.getByLabelText('fields.agreeToTerms'));

    fireEvent.click(screen.getByRole('button', { name: 'register.signUp' }));

    expect(await screen.findByText('register.errors.usernameTaken')).toBeInTheDocument();
  });

  it('should show generic server error message on 500', async () => {
    postSpy.mockRejectedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    } as unknown);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('fields.username'), {
      target: { value: 'Puszmen12' },
    });
    fireEvent.change(screen.getByLabelText('fields.email'), {
      target: { value: 'puszmen@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmEmail'), {
      target: { value: 'puszmen@example.com' },
    });
    fireEvent.change(screen.getByLabelText('fields.password'), {
      target: { value: 'Zaq1@WSX' },
    });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword'), {
      target: { value: 'Zaq1@WSX' },
    });
    fireEvent.click(screen.getByLabelText('fields.agreeToTerms'));

    fireEvent.click(screen.getByRole('button', { name: 'register.signUp' }));

    expect(await screen.findByText('errors.serverError')).toBeInTheDocument();
  });
});
