import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import { mockFetchForProducts } from '../../../utils/utils';
import HomepageMain from "./homepageMain";
import { MemoryRouter } from "react-router-dom";

describe("should render homepage", () => {

    test("should render item category route", async () => {
        window.fetch = () => mockFetchForProducts();
        render(<MemoryRouter initialEntries={['/']}>
            <HomepageMain />
        </MemoryRouter>)
        //a spinner should render and then remove
        waitForElementToBeRemoved(() => screen.findAllByTestId('product-spinner'));
        // checking the heading
        expect(screen.getByText('Categories')).toBeInTheDocument();
        //checking all the category image in the dom
        expect(screen.getByAltText('Bracelet')).toBeInTheDocument();
        expect(screen.getByAltText('Others')).toBeInTheDocument();
        expect(screen.getByAltText('Finger Rings')).toBeInTheDocument();
        expect(screen.getByAltText('Ear Rings')).toBeInTheDocument();
        expect(screen.getByAltText('Necklaces')).toBeInTheDocument();
        expect(screen.getByAltText('Toe Rings')).toBeInTheDocument();
    })
})