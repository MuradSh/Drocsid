import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';

// Mock the firebase auth and firestore
jest.mock('../firebase/auth', () => ({
    doSignInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: 'testUser' })),
}));

jest.mock('../firebase/firebase', () => ({
    firestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
}));

// Mock the useAuth context and react-router-dom's navigate function
jest.mock('../contexts/authContext', () => ({
    useAuth: () => ({
        userLoggedIn: true,
    }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

// Prepare mock events data
const mockEvents = [
    { id: '1', name: 'Concert Event', category: 'Concerts', description: 'A great concert' },
    { id: '2', name: 'Sports Event', category: 'Sports', description: 'An exciting match' }
];

describe('Landing Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        require('../firebase/firebase').getDocs.mockResolvedValue({
            docs: mockEvents.map(event => ({
                id: event.id,
                data: () => event
            }))
        });
    });


    test('renders the search input and category buttons', async () => {
        render(<Landing />, { wrapper: BrowserRouter });
    // Check for hero text
//     const adminPanel = screen.getByText(/Event Ticketing/i);
//     expect(adminPanel).not.toBeInTheDocument

//   });

        expect(screen.getByPlaceholderText('Search events')).toBeInTheDocument();
        expect(await screen.findByText('All')).toBeInTheDocument();
        expect(await screen.findByText('Concerts')).toBeInTheDocument();
        expect(await screen.findByText('Sports')).toBeInTheDocument();
        expect(await screen.findByText('Theater')).toBeInTheDocument();
    });

    test('allows typing in the search box', () => {
        render(<Landing />, { wrapper: BrowserRouter });

        const searchInput = screen.getByPlaceholderText('Search events');
        fireEvent.change(searchInput, { target: { value: 'Concert' } });

        expect(searchInput.value).toBe('Concert');
    });

    // test('displays events based on search criteria', async () => {
    //     render(<Landing />, { wrapper: BrowserRouter });
        
    //     const searchInput = screen.getByPlaceholderText('Search events');
    //     fireEvent.change(searchInput, { target: { value: 't' } });

    //     // Wait for the component to update based on the search input
    //     await waitFor(() => {
    //         expect(screen.getByText(/t/i)).toBeInTheDocument();
    //     });
    // });
});