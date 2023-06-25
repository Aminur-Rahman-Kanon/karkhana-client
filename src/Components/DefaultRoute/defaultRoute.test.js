import DefaultRoute from "./defaultRoute";
import { render } from '@testing-library/react';
import AuthContext from '../Others/AuthContext/authContext';

test('should render authContext component', () => {
    const defaultRoute = render(
        <AuthContext value={{data: 'test'}}>
            <DefaultRoute />
        </AuthContext>
    )

    //should it render the image and text in the dom
    expect(defaultRoute.getByRole('img', { name: 'default route' })).toHaveAccessibleName('default route');
    expect(defaultRoute.getByText('The request url was not found on the server')).toBeInTheDocument();
})