import Banner from "./banner";
import { screen, render } from '@testing-library/react';

describe("should render banner component", () => {
    test('should render slider image and heading', () => {
      render(<Banner />);
      expect(screen.getByTestId('carousel-container')).toBeInTheDocument();
    })
    
})