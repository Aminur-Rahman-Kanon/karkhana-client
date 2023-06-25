import Footer from "./footer";
import { render, screen } from '@testing-library/react';

test('should display Footer and its content', () => {
    render(<Footer />);

    //Checking whether all the header is present or not
    const allHeaders = screen.getAllByRole('heading');
    expect(allHeaders[0]).toHaveTextContent('CONTACT\ US');
    expect(allHeaders[1]).toHaveTextContent('CUSTOMER\ SERVICES');
    expect(allHeaders[2]).toHaveTextContent('ABOUT\ US');
    expect(allHeaders[3]).toHaveTextContent('CATALOG');

    //checking about us link
    expect(screen.getByRole('link', {name: 'About Us'})).toHaveAttribute('href', '/about-us')

    //Checking the contact details in the dom
    expect(screen.getByTestId("karkhana-facebook")).toHaveAttribute('href', 'https://www.facebook.com/karkhana1993')
    

    //Checking whether all the link in catalog
    expect(screen.getByRole('link', {name: 'Earrings'})).toHaveAttribute('href', '/products/earring');
    expect(screen.getByRole('link', {name: 'Necklaces'})).toHaveAttribute('href', '/products/necklace');
    expect(screen.getByRole('link', {name: 'Bracelets'})).toHaveAttribute('href', '/products/bracelet');
    expect(screen.getByRole('link', {name: 'Finger Rings'})).toHaveAttribute('href', '/products/fingerring');
    expect(screen.getByRole('link', {name: 'Toe Rings'})).toHaveAttribute('href', '/products/toering');
    expect(screen.getByRole('link', {name: 'Nepali'})).toHaveAttribute('href', '/products/nepali');
    expect(screen.getByRole('link', {name: 'Others'})).toHaveAttribute('href', '/products/other');

    //Checking for the payment images in the dom
    const bkashImg = screen.getByAltText("bikash")
    const masterCardImg = screen.getByAltText("master card")
    
    expect(bkashImg).toBeInTheDocument();
    expect(masterCardImg).toBeInTheDocument();
})
