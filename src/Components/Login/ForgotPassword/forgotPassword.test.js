import ForgotPassword from "./forgotPassword";
import { render, waitFor, act } from '@testing-library/react';
import userEvent from "@testing-library/user-event";


describe('should render forgot password', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    test('should forgotPassword component and all elements', async () => {
        const forgotPassword = render(
            <ForgotPassword />
        )

        //checking logo is present
        expect(forgotPassword.getByRole('img', { name: 'forgot-password-logo' })).toBeInTheDocument();

        //selecting the input and button
        const email = forgotPassword.getByTestId('email');
        const button = forgotPassword.getByRole('button', { name: 'Send Password Reset Link' })

        expect(email.value).toBe('');
        expect(button).toBeDisabled();

        act(() => {
            userEvent.type(email, 'test16@test.com');
        })

        //checking functionality of the elements
        await waitFor(() => expect(email.value).toEqual('test16@test.com'));
        
        act(() => {
            jest.runAllTimers();
        })

        await waitFor(() => expect(button).not.toBeDisabled());
    })

    afterEach(() => {
        jest.useRealTimers();
    })
})
