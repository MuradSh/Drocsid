import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

// Create a mock navigate function
const mockNavigate = jest.fn(); 

// Mock the useAuth context
jest.mock('../contexts/authContext', () => ({
  useAuth: () => ({
    userLoggedIn: false,
  }),
}));

// Mock the Firebase authentication function
jest.mock('../firebase/auth', () => ({
  doSignInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: 'testUser' })),
}));

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => {
  const actualReactRouterDom = jest.requireActual('react-router-dom');
  return {
    ...actualReactRouterDom,
    useNavigate: () => mockNavigate, // Return the mock navigate function here
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset(); // Reset the mock before each test
  });

  test('renders email and password fields and sign in button', () => {
    render(<Login />, { wrapper: BrowserRouter });

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows input to be entered in email and password fields', () => {
    render(<Login />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
  });

  test('successful login navigates to the landing page', async () => {
    render(<Login />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/landing');
    });
  });
});