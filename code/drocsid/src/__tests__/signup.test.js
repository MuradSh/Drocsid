import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../pages/Signup';

// Create a mock navigate function
const mockNavigate = jest.fn();

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => {
    const actualReactRouterDom = jest.requireActual('react-router-dom');
    return {
      ...actualReactRouterDom,
      useNavigate: () => mockNavigate, // Use the mock function here
    };
  });

// Mock the Firebase authentication function
jest.mock('../firebase/auth', () => ({
  doCreateUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: 'testUser' })),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('renders all form fields and submit button', () => {
    render(<SignUp />, { wrapper: BrowserRouter });

    expect(screen.getByPlaceholderText('User name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('allows input to be entered in form fields', () => {
    render(<SignUp />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('User name'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('User name').value).toBe('testuser');
    expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
    expect(screen.getByPlaceholderText('Confirm Password').value).toBe('password123');
  });

  test('successful sign-up navigates to the landing page', async () => {
    render(<SignUp />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByPlaceholderText('User name'), { target: { value: 'testusername' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/landing');
    });
  });
});