import { screen } from '@testing-library/react';
import { AccountLinks } from '@/app/components/AccountLinks';
import React from 'react';
import { renderWithProviders } from '@/app/utils/test-utils';

describe('AccountLinks component', () => {
    test('Login link is visible when user is not logged in', () => {
        renderWithProviders(<AccountLinks />, {
            preloadedState: {
                globalState: {
                    isLoggedIn: false,
                    isRegisterFormVisible: false,
                    isLoginFormVisible: false,
                    notifications: [],
                },
            },
        });

        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(loginLink).toBeInTheDocument();
    });

    test('For logged in user: Login -> not visible, Logout - visible, Account -> visible', () => {
        renderWithProviders(<AccountLinks />, {
            preloadedState: {
                globalState: {
                    isLoggedIn: true,
                    isRegisterFormVisible: false,
                    isLoginFormVisible: false,
                    notifications: [],
                },
            },
        });

        const loginLink = screen.queryByRole('link', { name: 'Login / Register' });
        const logoutLink = screen.getByRole('link', { name: /logout/i });
        const accountLink = screen.getByRole('link', { name: /account/i });

        expect(loginLink).not.toBeInTheDocument();
        expect(logoutLink).toBeInTheDocument();
        expect(accountLink).toBeInTheDocument();
    });
});
