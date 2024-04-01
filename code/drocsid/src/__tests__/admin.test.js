import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Admin from './Admin';
import * as authContext from '../../contexts/authContext';
import * as firebase from '../../firebase/firebase';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('../../contexts/authContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('../../firebase/firebase', () => ({
    firestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    deleteDoc: jest.fn(),
    updateDoc: jest.fn(),
    addDoc: jest.fn(),
    where: jest.fn(),
    query: jest.fn(),
}));

test('fetches items from Firestore', async () => {
    firebase.getDocs.mockResolvedValueOnce({
        docs: [{ id: 1, data: () => ({ verified: null }) }], // Example data
    });

    authContext.useAuth.mockImplementation(() => ({ userLoggedIn: true }));

    const { findByText } = render(<Admin />);
    const itemElement = await findByText(/Example Item/i);
    expect(itemElement).toBeInTheDocument();
});