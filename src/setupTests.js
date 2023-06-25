// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './utils/utils';
import { setLogger } from 'react-query';

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {}
})