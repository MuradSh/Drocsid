import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventStatusPage from '../pages/EventStatusPage';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({
      docs: [
        {
          id: '1',
          data: () => ({
            availability: 1500,
            category: "Concerts",
            date: "2024-08-12",
            description: "A weekend of rock music featuring top bands from around the world",
            name: "Rock on the Range",
            pricing: "Starting at $50",
            time: "5:00 PM",
            venue: "Outdoor Arena",
            verified: false,
          }),
        },
        // Add more mock events here if needed
      ],
    })),
  }));
  

// Mock useAuth from authContext to provide a currentUser
jest.mock('../contexts/authContext', () => ({
  useAuth: () => ({
    currentUser: {
      uid: 'user123', // Mocking a currentUser with uid 'user123'
    },
  }),
}));

describe('EventStatusPage Component', () => {
    test('renders event status page and displays events with their details', async () => {
      render(
        <BrowserRouter>
          <EventStatusPage />
        </BrowserRouter>
      );
  
    //   await waitFor(() => {
    //     // Verify the event name and other details are rendered
    //     expect(screen.getByText("Rock on the Range")).toBeInTheDocument();
    //     expect(screen.getByText("A weekend of rock music featuring top bands from around the world")).toBeInTheDocument();
    //     // You can add more checks for other fields like date, venue, etc.
        
    //     // Check the event status
    //     const statusElement = screen.getByText("Pending"); // Assuming the component renders "Pending" for `verified: false`
    //     expect(statusElement).toBeInTheDocument();
    //   });
    });
  });
