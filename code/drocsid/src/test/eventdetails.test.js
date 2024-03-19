import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import EventDetails from '../pages/EventDetails';
import { firestore } from '../firebase/firebase';
import * as firebase from 'firebase/firestore';

// Directly mock useParams and Firestore's getDoc without focusing on binary data
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
  }));
  
  jest.mock('firebase/firestore');
  
  describe('EventDetails Component', () => {
    beforeEach(() => {
      useParams.mockReturnValue({ eventId: 'mockEventId' });
      firestore.getDoc = jest.fn();
    });
  
    it('renders loading state initially', () => {
      const { getByText } = render(<EventDetails />);
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  
    it('displays event details after fetching', async () => {
      const mockEventData = {
        exists: () => true,
        data: () => ({
          name: 'Mock Event Name',
          date: '2023-12-24',
          time: '20:00',
          venue: 'Mock Venue',
          pricing: 'Free',
          availability: 'Available',
        }),
      };
  
      firestore.getDoc.mockResolvedValue(mockEventData);
  
      const { getByText } = render(<EventDetails />);
  
      await waitFor(() => {
        expect(getByText('Mock Event Name')).toBeInTheDocument();
        expect(getByText('2023-12-24')).toBeInTheDocument();
        // Add assertions for other event details here
      });
    });
  
    it('handles non-existent event documents gracefully', async () => {
      firestore.getDoc.mockResolvedValue({ exists: () => false });
  
      const { getByText } = render(<EventDetails />);
      
      // Since we are not actually changing the component based on the non-existence of the document,
      // this test just reiterates that the loading message is shown.
      // Ideally, you'd have a mechanism to display a "not found" message or similar.
      await waitFor(() => {
        expect(getByText('Loading...')).toBeInTheDocument();
      });
    });
  
    // You can add more tests here to cover additional scenarios or interactions.
  });