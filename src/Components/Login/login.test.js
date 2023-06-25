import  ReactDOM  from 'react-dom';
import Login from "./login";
import { render, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { mockLoginApi, sessionStorageMock, userData } from '../../utils/utils';

window.scrollTo = jest.fn();

// let mockFetchObj;

describe('should login user into the system', () => {
  beforeEach(() => {
    ReactDOM.createPortal = jest.fn((element, node) => element);
    Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })
  })
  
  test('should render login component and its functionality', async () => {
    const login = render(
      <MemoryRouter initialEntries={['/login']}>
          <Login />
      </MemoryRouter>
    )
  
    //selecting the input and button elements
    const emailInput = login.getByTestId('email-input');
    const passwordInput = login.getByTestId('password-input');
    const loginBtn = login.getByRole('button', { name: 'Login' });

    //checking inputs are empty and login button is disabled
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(loginBtn).toBeDisabled();

    //checking the links
    expect(login.getByRole('link', { name: 'Create Account' })).toHaveAttribute('href', '/register');
    expect(login.getByRole('link', { name: 'Forgot Password ?' })).toHaveAttribute('href', '/forgot-password');
  
    //checking input functionality
    //wrapping the userEvent in act() so we dont get act warning
    act(() => {
      userEvent.type(emailInput, 'test16@test.com');
      userEvent.type(passwordInput, 'asdf');
    });
  
    await waitFor(() => expect(emailInput.value).toEqual('test16@test.com'));
    await waitFor(() => expect(passwordInput.value).toEqual('asdf'));
    await waitFor(() => expect(loginBtn).not.toBeDisabled());
  })
  
  test('should successfully login user into the system', async () => {
    //mocking fecth method for this test
    const mockFetchObj = window.fetch = jest.fn(() => mockLoginApi('success'));

    const login = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    )

    const loginBtn = login.getByRole('button', { name: 'Login' })
    
    //simulating login functionality
    fireEvent.click(loginBtn);
  
    await waitFor(() => sessionStorageMock.setItem('user', JSON.stringify(userData)));
    await waitFor(() => expect(JSON.parse(sessionStorageMock.getItem('user'))).toEqual(userData));

    //clearing mockFetch for this test
    mockFetchObj.mockClear();
  })

  test('should login attempt failed with user not found', async () => {
    //mocking fetch method
    const mockFetchObj = window.fetch = jest.fn(() => mockLoginApi('user not found'));

    const login = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    //selecting the input and button elements
    const emailInput = login.getByTestId('email-input');
    const passwordInput = login.getByTestId('password-input');
    const loginBtn = login.getByRole('button', { name: 'Login' });

    //checking inputs are empty and login button is disabled
    expect(emailInput.textContent).toBe('');
    expect(passwordInput.textContent).toBe('');
    expect(loginBtn).toBeDisabled();

    //checking input functionality
    //wrapping the userEvent in act() so we dont get act warning
    act(() => {
      userEvent.type(emailInput, 'test16@test.com');
      userEvent.type(passwordInput, 'asdf');
    });

    await waitFor(() => expect(emailInput.value).toEqual('test16@test.com'));
    await waitFor(() => expect(passwordInput.value).toEqual('asdf'));
    await waitFor(() => expect(loginBtn).not.toBeDisabled());

    // simulating login functionality
    // wrapping the userEvent in act() so we dont get act warning
    act(() => {
      fireEvent.click(loginBtn);
    })

    //checking whether we're getting user not found error nr not
    await waitFor(() => expect(login.getByTestId('user-invalid').style.display).toEqual('block'))

    //clearing the mockFetch method
    mockFetchObj.mockClear();
  })

  test('should login attempt failed with password doesn\'t match', async () => {
    //mocking fetch method
    const mockFetchObj = window.fetch = jest.fn(() => mockLoginApi("password doesn't match"));

    const login = render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    )

    //selecting the input and button elements
    const emailInput = login.getByTestId('email-input');
    const passwordInput = login.getByTestId('password-input');
    const loginBtn = login.getByRole('button', { name: 'Login' });

    //checking inputs are empty and login button is disabled
    expect(emailInput.textContent).toBe('');
    expect(passwordInput.textContent).toBe('');
    expect(loginBtn).toBeDisabled();

    //checking input functionality
    //wrapping the userEvent in act() so we dont get act warning
    act(() => {
      userEvent.type(emailInput, 'test16@test.com');
      userEvent.type(passwordInput, 'asdf');
    });

    await waitFor(() => expect(emailInput.value).toEqual('test16@test.com'));
    await waitFor(() => expect(passwordInput.value).toEqual('asdf'));
    await waitFor(() => expect(loginBtn).not.toBeDisabled());

    // simulating login functionality
    // wrapping the userEvent in act() so we dont get act warning
    act(() => {
      fireEvent.click(loginBtn);
    })

    //checking whether we get password invalid error or not
    await waitFor(() => expect(login.getByTestId('password-invalid').style.display).toEqual('block'))

    //clearing mockFetch method
    mockFetchObj.mockClear();
  })

  test('should login attempt failed with network or other error', async () => {
    //mocking fetch method
    const mockFetchObj = window.fetch = jest.fn(() => mockLoginApi())

    const login = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    )

    //selecting the input and button elements
    const emailInput = login.getByTestId('email-input');
    const passwordInput = login.getByTestId('password-input');
    const loginBtn = login.getByRole('button', { name: 'Login' });

    //checking inputs are empty and login button is disabled
    expect(emailInput.textContent).toBe('');
    expect(passwordInput.textContent).toBe('');
    expect(loginBtn).toBeDisabled();

    //checking input functionality
    //wrapping the userEvent in act() so we dont get act warning
    act(() => {
      userEvent.type(emailInput, 'test16@test.com');
      userEvent.type(passwordInput, 'asdf');
    });

    await waitFor(() => expect(emailInput.value).toEqual('test16@test.com'));
    await waitFor(() => expect(passwordInput.value).toEqual('asdf'));
    await waitFor(() => expect(loginBtn).not.toBeDisabled());

    // simulating login functionality
    // wrapping the userEvent in act() so we dont get act warning
    act(() => {
      fireEvent.click(loginBtn);
    })

    //checking whether we get something went wrong error or not
    await waitFor(() => expect(login.getByTestId('network-error')).toBeInTheDocument());

    //clearing mockFetch method
    mockFetchObj.mockClear();
  })
  
  afterEach(() => {
    ReactDOM.createPortal.mockClear();
    sessionStorageMock.clear();
  })
})
