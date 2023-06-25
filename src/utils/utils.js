import React from 'react';
import ErrorBoundary from '../Components/ErrorBoundary/errorBoundary';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const handlers = [
    rest.get('https://karkhana-server.onrender.com/products', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'success',
                data: {
                    featured: [],
                    fingerring: [],
                    trending: [],
                    topseller: [],
                    exclusive: []
                }
            })
        )
    }), 

    rest.post('https://karkhana-server.onrender.com/register', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'success'
            })
        )
    })
]

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const mockFallback = <h1>Helllo</h1>

export const renderWithClient = ({children, route}) => {
    const testQueryClient = createTestQueryClient();
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>
            <ErrorBoundary fallbackUI={mockFallback}>
                <MemoryRouter initialEntries={route}>
                    {children}
                </MemoryRouter>
            </ErrorBoundary>
        </QueryClientProvider>
    )
    return {
        ...result,
        rerender: ({children, route}) => rerender(
            <QueryClientProvider client={testQueryClient}>
                <ErrorBoundary fallbackUI={mockFallback}>
                    <MemoryRouter initialEntries={route}>
                        {children}
                    </MemoryRouter>
                </ErrorBoundary>
            </QueryClientProvider>
        )
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient();
    return ({children}) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
}

export const userData = {
    address: "10/1 South Jatrabari, Dhaka",
    city: 'dhaka',
    email: "test16@test.com",
    firstName: "Aminur",
    imgLink: "https://karkhana-server.onrender.com/assets/users/test16@test.com.jpg",
    lastName: "Rahmans",
    password: "$2b$10$A.hE5HaGTIsl5CO96SlDUuObpwOmNjaGFZu7p2yb20kZL7.Q0BUm6",
    phoneNumber: "014784545800",
    state: "Dhaka",
    thana: "Jatrabari",
    zipcode: "1236",
    _id: "64407018611579f0ae7a8e27"
}

export function mockLoginApi (status) {
    switch(status){
        case 'success':
            return Promise.resolve({
                json: () => Promise.resolve(
                  {
                    status: 'success',
                    user: userData
                  }
                )
            })
        case 'user not found':
            return Promise.resolve({
                json: () => Promise.resolve({
                    status: 'user not found'
                })
            })
        case "password doesn't match":
            return Promise.resolve({
                json: () => Promise.resolve({
                    status: "password doesn't match"
                })
            })
        default:
            return Promise.reject(new Error('fail'));
    }
}

export const sessionStorageMock = (() => {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        removeItem(key) {
            delete store[key]
        },

        clear () {
            store = {};
        },

        getAll () {
            return store;
        }
    }
})();

export function mockRegisterApi (type) {
    if (type === 'success'){
        return Promise.resolve({
            json: () => Promise.resolve({
                status: 'success'
            })
        })
    }
    else if (type === 'user exist'){
        return Promise.resolve({
            json: () => Promise.resolve({
                status: 'user exist'
            })
        })
    }
    else {
        return Promise.reject(new Error('fail'));
    }
}
