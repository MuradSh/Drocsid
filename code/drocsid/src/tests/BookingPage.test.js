import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingPage from '../pages/BookingPage'; // Adjust the import path as necessary
import '@testing-library/jest-dom';


// Mocking Firebase Firestore and Auth
jest.mock('../firebase/firebase', () => ({
  firestore: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: { uid: 'testUserId' } })),
}));

// Mock runTransaction
const mockRunTransaction = jest.fn();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  runTransaction: () => mockRunTransaction(),
}));

// Mock react-router hooks
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ eventId: 'testEventId' }),
}));

describe('BookingPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockRunTransaction.mockClear();
  });

  test('renders BookingPage and submits form', async () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    );

    // Increase ticket quantity
    fireEvent.click(getByText('+'));

    // Submit the form
    fireEvent.submit(getByText('Confirm Booking'));

    // Check if navigate was called after successful booking
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/booking-success');
    });

    // Check if runTransaction was called correctly
    expect(mockRunTransaction).toHaveBeenCalled();
  });

  // Additional tests can be added to check form validation, error handling, etc.
});
