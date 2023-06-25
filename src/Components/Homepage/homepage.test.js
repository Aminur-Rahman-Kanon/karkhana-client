import { findByRole, render } from "@testing-library/react";
import { renderWithClient } from '../../utils/utils';
import Homepage from "./homepage";
import AuthContext from "../Others/AuthContext/authContext";

describe("should render homepage", () => {

    test("should render item category route", async () => {
        const homepage = renderWithClient({ children: <AuthContext value={{value: 'test'}}>
            <Homepage />
        </AuthContext>,
        route: ['/']});

        //checking the heading
        expect(homepage.getByRole('heading', {name: 'Categories'})).toBeInTheDocument();

        //checking all the category image in the dom
        expect(homepage.getByRole('img', { name: 'Bracelet' })).toBeInTheDocument();
        expect(homepage.getByRole('img', { name: 'Others' })).toBeInTheDocument();
        expect(homepage.getByRole('img', { name: 'Finger Rings' })).toBeInTheDocument();
        expect(homepage.getByRole('img', { name: 'Ear Rings' })).toBeInTheDocument();
        expect(homepage.getByRole('img', { name: 'Necklaces' })).toBeInTheDocument();
        expect(homepage.getByRole('img', { name: 'Toe Rings' })).toBeInTheDocument();
    })
})