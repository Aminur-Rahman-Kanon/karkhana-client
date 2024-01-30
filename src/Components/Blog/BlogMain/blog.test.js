import BlogMain from "./blogMain";
import { render, screen, waitFor } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockBlogProducts } from '../../../utils/utils';

// window.scrollTo = jest.fn();
// window.fetch = () => mockBlogProducts();

test('should render blog component', () => {
    // render(
    //     <MemoryRouter initialEntries={['/blog']}>
    //         <AuthContext value={{}}>
    //             <BlogMain />
    //         </AuthContext>
    //     </MemoryRouter>
    // )
    // //should all intro blog in the dom
    // waitFor(() => expect(screen.findByTestId('intro-blog1')).toBeInTheDocument());
    // waitFor(() => expect(screen.findByTestId('intro-blog2')).toBeInTheDocument());
    // waitFor(() => expect(screen.findByTestId('intro-blog3')).toBeInTheDocument());

})