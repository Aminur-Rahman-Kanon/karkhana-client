import Navbar from './navbar';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthContext from "../../Others/AuthContext/authContext";
import { MemoryRouter } from 'react-router-dom';

test('<Navbar />', async () => {
    const navbar = render(<MemoryRouter initialEntries={['/']}>
        <AuthContext value={{value: 'test'}}>
            <Navbar />
        </AuthContext>
    </MemoryRouter>);
    
    //checking the homepage link class active and the path to be "/"
    const homeHref = navbar.getByRole('link',{ name:'Home' });
    expect(homeHref).toHaveAttribute('href', '/');
    expect(homeHref.className).toBe('navItem navActive');

    //checking all other link
    expect(navbar.getByRole('link', { name: 'Latest' })).toHaveAttribute('href', '/products/latest');
    expect(navbar.getByRole('link', { name: 'Featured' })).toHaveAttribute('href', '/products/featured');
    expect(navbar.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    expect(navbar.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about-us');

    //checking logo and its link
    expect(navbar.getByRole('link', { name: 'karkhana logo' })).toHaveAttribute('href', '/');
    expect(navbar.getByRole('img', { name: 'karkhana logo' })).toBeInTheDocument();
    
    //checking products link should render its 7 child link
    const productsParentLink = navbar.getByTestId('products-parent-link');
    
    fireEvent.mouseOver(productsParentLink);
    await waitFor(() => navbar.getByTestId('products-childs-link'));
    expect(navbar.getByRole('link', { name: 'bracelet Bracelets' })).toHaveAttribute('href', '/products/bracelet');
    expect(navbar.getByRole('link', { name: 'finger ring Finger Rings' })).toHaveAttribute('href', '/products/finger-ring');
    expect(navbar.getByRole('link', { name: 'ear ring Ear Rings' })).toHaveAttribute('href', '/products/ear-ring');
    expect(navbar.getByRole('link', { name: 'necklace Necklaces' })).toHaveAttribute('href', '/products/necklace');
    expect(navbar.getByRole('link', { name: 'toe ring Toe Rings' })).toHaveAttribute('href', '/products/toe-ring');
    expect(navbar.getByRole('link', { name: 'nepali Nepali' })).toHaveAttribute('href', '/products/nepali');
    expect(navbar.getByRole('link', { name: 'other Others' })).toHaveAttribute('href', '/products/others');
})
    