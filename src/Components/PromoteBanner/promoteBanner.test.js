import { render, screen } from '@testing-library/react';
import PromoteBanner from './promoteBanner';

test('should render PromoteBanner component', () => {
    //rendering component bypassing category 1. category 1 is the image type that should render
    render(<PromoteBanner category={'cat1'}/>);
    //checking whether appropriate image rendered or not
    expect(screen.getByTestId('promote-banner')).toBeInTheDocument();
})