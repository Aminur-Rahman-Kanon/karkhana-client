import BlogMain from "./blogMain";
import { render } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../../Others/mockProductsData/mockProductsData";

window.scrollTo = jest.fn();

test('should render blog component', () => {
    const blog = render(
        <MemoryRouter initialEntries={['/blog']}>
            <AuthContext value={{data: mockProducts}}>
                <BlogMain />
            </AuthContext>
        </MemoryRouter>
    )

    //should all intro blog in the dom
    expect(blog.getByTestId('intro-blog1')).toBeInTheDocument();
    expect(blog.getByTestId('intro-blog2')).toBeInTheDocument();
    expect(blog.getByTestId('intro-blog3')).toBeInTheDocument();
})