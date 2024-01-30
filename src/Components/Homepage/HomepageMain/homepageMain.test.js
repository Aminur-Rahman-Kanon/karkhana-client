import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import { mockFetchForProducts } from '../../../utils/utils';
import HomepageMain from "./homepageMain";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("should render homepage", () => {

    test("should render item category route", async () => {
        window.fetch = () => mockFetchForProducts();
        render(<MemoryRouter initialEntries={['/']}>
            <HomepageMain />
        </MemoryRouter>)

        waitForElementToBeRemoved(() => screen.findAllByTestId('product-spinner'));

        //checking the heading
        // await expect(screen.findByRole('heading', {name: 'Categories'})).toBeInTheDocument();

        // //checking all the category image in the dom
        // await expect(screen.findByRole('img', { name: 'Bracelet' })).toBeInTheDocument();
        // await expect(screen.findByRole('img', { name: 'Others' })).toBeInTheDocument();
        // await expect(screen.findByRole('img', { name: 'Finger Rings' })).toBeInTheDocument();
        // await expect(screen.findByRole('img', { name: 'Ear Rings' })).toBeInTheDocument();
        // await expect(screen.findByRole('img', { name: 'Necklaces' })).toBeInTheDocument();
        // await expect(screen.findByRole('img', { name: 'Toe Rings' })).toBeInTheDocument();
    })
})