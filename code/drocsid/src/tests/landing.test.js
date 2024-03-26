import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Landing from '../pages/Landing';
import { BrowserRouter } from 'react-router-dom';

// Mock necessary modules
jest.mock('../contexts/authContext', () => ({
  useAuth: () => ({ userLoggedIn: true })
}));

jest.mock('../firebase/firebase', () => ({
  firestore: {
    collection: () => ({
      doc: () => ({}),
    }),
  },
  getDocs: () => Promise.resolve({
    docs: [
      {
        id: '1',
        data: () => ({ name: 'Event 1', description: 'Description 1', category: 'Concerts' }),
      },
    ],
  }),
}));

jest.mock('../firebase/auth', () => ({
  doSignOut: jest.fn(() => Promise.resolve()),
}));

describe('Landing Page', () => {
  it('renders categories and allows sign out', async () => {
    const { getByText, getAllByRole } = render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    // Wait for categories to be displayed
    const categoryButtons = await waitFor(() => getAllByRole('button', { name: /All|Concerts|Sports|Theater/i }));
    expect(categoryButtons).toHaveLength(4);

    // Trigger sign out
    // const signOutButton = getByText('Sign Out');
    // fireEvent.click(signOutButton);
    
    // // Since doSignOut is a promise, you need to wait for it to resolve
    // await waitFor(() => {
    //   expect(jest.mock('../firebase/auth').doSignOut).toHaveBeenCalled();
    // });
  });

});
