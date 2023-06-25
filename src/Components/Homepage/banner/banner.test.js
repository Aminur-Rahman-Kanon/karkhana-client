import Banner from "./banner";
import { screen, render } from '@testing-library/react';

describe("should render banner component", () => {
    test('should render slider image and heading', () => {
      const result = render(<Banner />);
      
      expect(result.getByRole('img', { name: 'karkhana-slider' })).toBeInTheDocument();
      expect(result.getByRole('heading', { name: 'KARKHANA' })).toBeInTheDocument();
      expect(result.getByText(/FREE DELIVERY INSIDE DHAKA/)).toBeInTheDocument();
    })
    
})