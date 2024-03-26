import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';

describe('BookingPage', () => {
  test('renders and allows ticket quantity adjustment', () => {

const { getByLabelText, getByText, getByRole } = render(
  <MemoryRouter>
    <BookingPage />
  </MemoryRouter>
);


    // Check if the ticket quantity input is rendered
    const ticketQuantityInput = getByLabelText('Ticket Quantity');
    expect(ticketQuantityInput).toHaveValue(1); // Default value check

    // Increase ticket quantity
    fireEvent.click(getByText('+'));
    expect(ticketQuantityInput).toHaveValue(2);

    // Decrease ticket quantity
    fireEvent.click(getByText('-'));
    expect(ticketQuantityInput).toHaveValue(1);


    //check for the presence of the confirm booking button
    const confirmBookingButton = getByRole('button', { name: /confirm booking/i });
    expect(confirmBookingButton).toBeInTheDocument();
  });

});
