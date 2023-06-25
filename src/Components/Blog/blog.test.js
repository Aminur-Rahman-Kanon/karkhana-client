import Blog from "./blog";
import { render } from '@testing-library/react';
import AuthContext from "../Others/AuthContext/authContext";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../Products/ProductsList/mockProductsData/mockProductsData";

window.scrollTo = jest.fn();

test('should render blog component', () => {
    const blog = render(
        <MemoryRouter initialEntries={['/blog']}>
            <AuthContext value={{data: mockProducts}}>
                <Blog />
            </AuthContext>
        </MemoryRouter>
    )

    //should all intro blog in the dom
    expect(blog.getByTestId('intro-blog1')).toBeInTheDocument();
    expect(blog.getByTestId('intro-blog2')).toBeInTheDocument();
    expect(blog.getByTestId('intro-blog3')).toBeInTheDocument();
})