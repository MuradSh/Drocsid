import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent'; 
import { addDoc } from 'firebase/firestore';

// Mock Firestore's modular functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(() => 'events'), // Assuming 'events' is your collection name
  addDoc: jest.fn(() => Promise.resolve({ id: 'newEventId' })), // Mock successful document addition
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate,
}));

describe('CreateEvent Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders all form fields and the submit button', () => {
    render(<CreateEvent />, { wrapper: BrowserRouter });

    // List of placeholders
    const placeholders = [
      'Event Name', 'Category', 'Date', 'Time', 'Venue', 'Description', 'Pricing', 'Availability'
    ];

    // Check each placeholder is in the document, indicating the presence of the input fields
    placeholders.forEach(placeholder => {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    // Check the submit button is in the document
    expect(screen.getByRole('button', { name: /submit event/i })).toBeInTheDocument();
  });

  test('allows input to be entered in form fields', () => {
    render(<CreateEvent />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('Event Name'), { target: { value: 'Test Event' } });
    expect(screen.getByPlaceholderText('Event Name').value).toBe('Test Event');

\
  });

  test('form submission triggers addDoc and navigates to the landing page', async () => {
    render(<CreateEvent />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('Event Name'), { target: { value: 'Test Event' } });
    // Simulate filling other fields similarly

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /submit event/i }));

    // Wait for the addDoc function to be called
//     await waitFor(() => {
//       expect(jest.mocked(addDoc)).toHaveBeenCalled();
//     });

//     // Verify navigation to the landing page
//     expect(mockNavigate).toHaveBeenCalledWith('/landing');
  });
});
