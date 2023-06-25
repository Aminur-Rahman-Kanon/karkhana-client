import Topbar from "./topbar";
// import { renderWithClient } from '../../utils/utils';
import { render, fireEvent } from '@testing-library/react';
import AuthContext from "../Others/AuthContext/authContext";
import { MemoryRouter, Routes, Route } from 'react-router-dom';

test('should render search icon', async () => {
    const topbar = render(<MemoryRouter initialEntries={['/']}>
        <AuthContext value={{value: 'test'}}>
            <Topbar />
        </AuthContext>
    </MemoryRouter>)
  
    //cheking search icon
    const searchBtn = topbar.container.querySelector("[data-icon='magnifying-glass']");
    expect(searchBtn).toBeInTheDocument();

    //search console should pop up while cliking on the search button
    fireEvent.click(searchBtn);

    await expect((await topbar.findByTestId('search-input-main')).className).toBe('searchInputMain show');
})