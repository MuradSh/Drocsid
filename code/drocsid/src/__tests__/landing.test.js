import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../pages/Landing'; // Replace './Landing' with your actual path

const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});


const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});


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


  it('renders the Organizer link if organizer is true in sessionStorage', () => {
    window.sessionStorage.setItem("organizer", 'true');

    render(<Navigation />);

    expect(screen.getByHref('/organizer')).toBeInTheDocument();
  });

});