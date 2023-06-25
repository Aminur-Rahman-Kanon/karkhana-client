import ErrorBoundary from "./errorBoundary";
import { render } from '@testing-library/react';

let consoleErrorSpy;

beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
})

const ThrowError = () => {
    throw new Error('test error');
}

test('should error boundary return error', () => {
    const errorBoundary = render(
        <ErrorBoundary fallbackUI={<p>Test error</p>}>
            <ThrowError />
        </ErrorBoundary>
    )

    expect(errorBoundary.getByText('Test error')).toBeInTheDocument();
})

afterAll(() => {
    consoleErrorSpy.mockRestore();
})
