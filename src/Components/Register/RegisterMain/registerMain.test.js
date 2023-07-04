import RegisterMain from "./registerMain";
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { mockRegisterApi } from "../../../utils/utils";
import ReactDOM from 'react-dom';


describe('<Register />', () => {
    //mocking the setTimeout and the createPortal to run for each test defined below
    beforeEach(() => {
        jest.useFakeTimers();
        ReactDOM.createPortal = jest.fn((element, node) => element);
    })
    
    test('should render register and all its element', () => {
        render(
          <MemoryRouter initialEntries={['/register']}>
              <RegisterMain />
          </MemoryRouter>
        )
        //selecting the inputs and button
        const firstName = screen.getByTestId('first-name');
        const lastName = screen.getByTestId('last-name');
        const email = screen.getByTestId('email');
        const phone = screen.getByTestId('phone');
        const password1 = screen.getByTestId('password-1');
        const password2 = screen.getByTestId('password-2');
        const button = screen.getByRole('button', { name: 'Register' })
    
        //asserting all the elements for the initial render
        expect(firstName.value).toEqual('');
        expect(lastName.value).toEqual('');
        expect(email.value).toEqual('');
        expect(phone.value).toEqual('');
        expect(password1.value).toEqual('');
        expect(password2.value).toEqual('');
        expect(button).toBeDisabled();
    
        //simulating value insertion into input field
        act(() => {
            userEvent.type(firstName, 'test');
            userEvent.type(lastName, 'user');
            userEvent.type(email, 'test@test.com');
            userEvent.type(phone, '12345678901')
            userEvent.type(password1, 'asdf');
            userEvent.type(password2, 'asdf');
        })

        //asserting after entering value to the inputs
        expect(firstName.value).toEqual('test');
        expect(lastName.value).toEqual('user');
        expect(email.value).toEqual('test@test.com');
        expect(phone.value).toEqual('12345678901');
        expect(password1.value).toEqual('asdf');
        expect(password2.value).toEqual('asdf');

        //running all the timers
        act(() => {
            jest.runAllTimers();
        })

        //since button will be enabled after setTimeout finish,
        //so we place the assertion after the time simulation effect
        expect(button).not.toBeDisabled();
    })
    
    test('should successfully register user to the sytem', async () => {
        const mockFetchObj = jest.fn(() => mockRegisterApi('success'));

        render(
            <MemoryRouter initialEntries={['/register']}>
                <RegisterMain />
            </MemoryRouter>
        )

        //inserting value into the input fields
        act(() => {
            userEvent.type(screen.getByTestId('first-name'), 'test');
            userEvent.type(screen.getByTestId('last-name'), 'user');
            userEvent.type(screen.getByTestId('email'), 'test@test.com');
            userEvent.type(screen.getByTestId('phone'), '12345678901');
            userEvent.type(screen.getByTestId('password-1'), 'test');
            userEvent.type(screen.getByTestId('password-2'), 'test');
        })
        
        //running all the timers
        act(() => {
            jest.runAllTimers();
        })

        //asserting register button to be enabled
        const registerBtn = screen.getByRole('button', { name: 'Register' });
        expect(registerBtn).not.toBeDisabled();
        
        //simulating register button click
        act(() => {
            userEvent.click(registerBtn);
        })

        //asserting the response from the server
        await waitForElementToBeRemoved(() => screen.getByText('Please wait'));
        await waitFor(() => expect(screen.getByText('User registered')).toBeInTheDocument());

        //clearing the mockFetch method
        mockFetchObj.mockClear();
    })

    test('should register fail with user exist message', async () => {
        //mocking fetch method
        const mockFetchObj = window.fetch = jest.fn(() => mockRegisterApi('user exist'));

        const register = render(
            <MemoryRouter initialEntries={['/register']}>
                <RegisterMain />
            </MemoryRouter>
        )

        //inserting value to the inputs
        act(() => {
            userEvent.type(screen.getByTestId('first-name'), 'test');
            userEvent.type(screen.getByTestId('last-name'), 'user');
            userEvent.type(screen.getByTestId('email'), 'test@test.com');
            userEvent.type(screen.getByTestId('phone'), '12345678901');
            userEvent.type(screen.getByTestId('password-1'), 'asdf');
            userEvent.type(screen.getByTestId('password-2'), 'asdf');
        })

        //running all the timers
        act(() => {
            jest.runAllTimers();
        })

        //asserting register button to be enabled
        const registerBtn = screen.getByRole('button', { name: 'Register' });
        expect(registerBtn).not.toBeDisabled();

        //simulating register button click
        act(() => {
            userEvent.click(registerBtn);
        })

        //asserting the response from the server
        await waitForElementToBeRemoved(() => screen.getByText('Please wait'));
        await waitFor(() => expect(screen.getByTestId('user-exist').style.display).toEqual('block'));

        //clearing mockFetch method
        mockFetchObj.mockClear();
    })

    test('should register fail with network or fetch fail error', async () => {
        //mocking fetch method
        const mockFetchObj = window.fetch = jest.fn(() => mockRegisterApi());

        const register = render(
            <MemoryRouter initialEntries={['/register']}>
                <RegisterMain />
            </MemoryRouter>
        )

        //inserting value to the inputs
        act(() => {
            userEvent.type(screen.getByTestId('first-name'), 'test');
            userEvent.type(screen.getByTestId('last-name'), 'user');
            userEvent.type(screen.getByTestId('email'), 'test@test.com');
            userEvent.type(screen.getByTestId('phone'), '12345678901');
            userEvent.type(screen.getByTestId('password-1'), 'asdf');
            userEvent.type(screen.getByTestId('password-2'), 'asdf');
        })

        //running all the timers
        act(() => {
            jest.runAllTimers();
        })

        //asserting register button to be enabled
        const registerBtn = screen.getByRole('button', { name: 'Register' });
        expect(registerBtn).not.toBeDisabled();

        //simulating register button click
        act(() => {
            userEvent.click(registerBtn);
        })

        //asserting the response from the server
        await waitForElementToBeRemoved(() => screen.getByText('Please wait'));
        await waitFor(() => expect(screen.getByText('Something went wrong')).toBeInTheDocument());

        //clearing mockFetch method
        mockFetchObj.mockClear();
    })

    //clearing all the mock to return back to their original forms
    afterEach(() => {
        jest.useRealTimers();
        ReactDOM.createPortal.mockClear();
    })
    
})