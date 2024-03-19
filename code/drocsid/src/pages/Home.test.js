import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock external hooks and libraries
jest.mock('../contexts/authContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../firebase/firebase', () => ({
  firestore: {},
}));
jest.mock('firebase/firestore');

describe('Home Component', () => {
  // Example Firestore data
  const mockEvents = [
    { id: '1', name: 'Concert A', description: 'Concert Description', category: 'Concerts' },
    { id: '2', name: 'Sport B', description: 'Sport Description', category: 'Sports' },
    // Add more mock events as needed
  ];

  beforeAll(() => {
    // Mock Firestore getDocs function
    getDocs.mockImplementation(() => ({
      docs: mockEvents.map(event => ({
        id: event.id,
        data: () => event,
      })),
    }));
  });

  it('redirects if user is not logged in', () => {
    useAuth.mockImplementation(() => ({ userLoggedIn: false }));
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    render(<Home />);

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('renders category buttons', () => {
    useAuth.mockImplementation(() => ({ userLoggedIn: true }));

    const { getByText } = render(<Home />);
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Concerts')).toBeInTheDocument();
    expect(getByText('Sports')).toBeInTheDocument();
    expect(getByText('Theater')).toBeInTheDocument();
  });

  it('filters events based on selected category', async () => {
    useAuth.mockImplementation(() => ({ userLoggedIn: true }));

    const { getByText } = render(<Home />);

    // Initially, all events are shown
    mockEvents.forEach(event => {
      expect(getByText(event.name)).toBeInTheDocument();
    });

    // Filter by category
    fireEvent.click(getByText('Concerts'));

    await waitFor(() => {
      expect(getByText('Concert A')).toBeInTheDocument();
      expect(() => getByText('Sport B')).toThrow(); // Sport B should not be visible after filtering
    });
  });

  // Add more tests as needed to cover other functionalities and scenarios
});
