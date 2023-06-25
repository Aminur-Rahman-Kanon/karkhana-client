import AboutUs from "./aboutUs";
import { render } from '@testing-library/react';
import AuthContext from "../Others/AuthContext/authContext";
import { MemoryRouter } from 'react-router-dom';
import aboutUs from "./aboutUs";


test('should render aboutUs component', () => {
    const aboutUs = render(
        <MemoryRouter initialEntries={['/about-us']}>
            <AuthContext value={{ data: 'test' }}>
                <AboutUs />
            </AuthContext>
        </MemoryRouter>
    )

    //should all the image be rendered
    expect(aboutUs.getByTestId('about-us-intro-1')).toBeInTheDocument();
    expect(aboutUs.getByTestId('about-us-intro-2')).toBeInTheDocument();
    expect(aboutUs.getByTestId('about-us-author-1')).toBeInTheDocument();
    expect(aboutUs.getByTestId('about-us-author-2')).toBeInTheDocument();
    expect(aboutUs.getByTestId('about-us-author-3')).toBeInTheDocument();

    //checking all the headers
    expect(aboutUs.getByText('OUR STORY')).toBeInTheDocument();
    expect(aboutUs.getByText('ABOUT KARKHANA')).toBeInTheDocument();
    expect(aboutUs.getByText('OUR MISSION')).toBeInTheDocument();
    expect(aboutUs.getByText('OUR VISION')).toBeInTheDocument();
    expect(aboutUs.getByText('FROM THE AUTHOR')).toBeInTheDocument();
})