import BlogMain from "./blogMain";
import { render, screen, waitFor } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockBlogProducts } from '../../../utils/utils';

beforeEach(() => {
    global.fetch = jest.fn(() => mockBlogProducts());
    global.scrollTo = jest.fn();
})

afterEach(() => {
    fetch.mockClear();
    scrollTo.mockClear();
})

test('should render blog component', () => {
    render(
        <MemoryRouter initialEntries={['/blog']}>
            <AuthContext value={{}}>
                <BlogMain />
            </AuthContext>
        </MemoryRouter>
    )
    //checking for the items are present in the dom due to fetch call
    waitFor(() => expect(screen.findByTestId('intro-blog1')).toBeInTheDocument());
    waitFor(() => expect(screen.findByTestId('intro-blog2')).toBeInTheDocument());
    waitFor(() => expect(screen.findByTestId('intro-blog3')).toBeInTheDocument());
    waitFor(() => expect(screen.getByAltText("Very awesome product. Light in weight not sure about durability but very nice product. Easy to use. Good one for this price. Very impressive.")).toBeInTheDocument());
})