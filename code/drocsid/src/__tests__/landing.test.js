import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../src/pages/Landing'; // Replace './Landing' with your actual path

// Test suite for Landing component
describe('Landing component', () => {
  // Test case for basic rendering
  it('should render the landing page with correct elements', () => {
    render(<Landing />);

    // Check for navbar elements
    const navbar = screen.getByTestId('navMenu'); // Assuming you have added a data-testid attribute to the navbar element
    expect(navbar).toBeInTheDocument();

    // Check for logo
    const logo = screen.getByText(/drocsid/i); // Using regular expression for case-insensitive matching
    expect(logo).toBeInTheDocument();

    // Check for hero section elements
    const heroImg = screen.getByRole('img', { name: /hero image/i }); // Using role and name for accessibility testing
    expect(heroImg).toBeInTheDocument();

    // Check for hero text
    const heroText = screen.getByText(/Event Ticketing/i);
    expect(heroText).toBeInTheDocument();

    // Check for info section elements
    const infoSection = screen.getByTestId('info-section'); // Assuming you added a data-testid attribute to the info section
    expect(infoSection).toBeInTheDocument();

    // Check for info pieces
    const infoPieces = screen.getAllByTestId('info-piece'); // Finding all elements with data-testid="info-piece"
    expect(infoPieces.length).toBe(3); // Checking for three info pieces

    // Check for hero text
    const adminPanel = screen.getByText(/Event Ticketing/i);
    expect(adminPanel).not.toBeInTheDocument

  });

});