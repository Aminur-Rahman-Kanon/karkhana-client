import React from 'react';
import ErrorBoundary from '../Components/ErrorBoundary/errorBoundary';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const mockFetchForProducts = () => {
    return Promise.resolve({
        json: () => Promise.resolve({
            data: [
                {
                    _id: '643b46aea3131c2f75ec5ce1',
                    category: "Featured",
                    rating: 2,
                    name: "Featured 1",
                    img: [
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1'
                    ],
                    price: "5000",
                    quantity: 10,
                    details: "Laboris veniam mollit irure ut do pariatur excepteur.",
                    impression:0
                },
                {
                    _id: '643b46aea3131c2f75ec5ce2',
                    category: "Featured",
                    rating: 2,
                    name: "Featured 2",
                    img: [
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1',
                        'https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Ffeatured%2Ffeatured%201%2Ffeatured%2011?alt=media&token=31132931-3050-4c2d-a447-e9c16622bef1'
                    ],
                    price: "6000",
                    quantity: 10,
                    details: "Laboris veniam mollit irure ut do pariatur excepteur.",
                    impression:0
                }
            ]
        })
    })
}

export const mockBlogProducts = () => Promise.resolve({
    json: Promise.resolve({
        data: [
            {
                _id: "643f751554e9733784aef34c",
                img: "https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Fblog%2Fblog1.jpg?alt=media&token=83755a3c-e70b-46ce-b5d0-0ab3044a3499",
                title: "Very awesome product. Light in weight not sure about durability but very nice product. Easy to use. Good one for this price. Very impressive.",
                date: "03/05/23",
                details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum.",
                category: "Blog"
            },
            {
                _id: "643f751554e9733784aef34d",
                img: "https://firebasestorage.googleapis.com/v0/b/karkhana-c685d.appspot.com/o/products%2Fblog%2Fblog2.jpg?alt=media&token=a6f712eb-1948-4473-ba6f-42ebaae3c075",
                title: "Sunt officia officia magna excepteur ad reprehenderit occaecat molsa.",
                date: "13/02/23",
                details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum.",
                category: "Blog"
            }
        ]
    })
})

export const handlers = [
    rest.get('*/products', (req, res, ctx) => {
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

    rest.post('*/register', (req, res, ctx) => {
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
