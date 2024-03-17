import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../pages/Signup';
import * as reactRouterDom from 'react-router-dom';
import * as auth from '../firebase/auth';

// Mocks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import then overwrite
  useNavigate: jest.fn(),
}));

jest.mock('../firebase/auth', () => ({
  doCreateUserWithEmailAndPassword: jest.fn(),
}));

describe('SignUp Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockNavigate.mockReset();
    reactRouterDom.useNavigate.mockImplementation(() => mockNavigate);
    auth.doCreateUserWithEmailAndPassword.mockReset();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    expect(getByPlaceholderText('User name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  it('shows an alert and does not navigate if passwords do not match', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByPlaceholderText, getByValue } = render(<SignUp />);

    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password2' } });
    fireEvent.click(getByValue('Sign up'));

    expect(alertMock).toHaveBeenCalledWith("Passwords don't match.");
    expect(mockNavigate).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });

  it('calls doCreateUserWithEmailAndPassword and navigates on successful sign up', async () => {
    auth.doCreateUserWithEmailAndPassword.mockResolvedValueOnce({});
    const { getByPlaceholderText, getByValue } = render(<SignUp />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByValue('Sign up'));

    await waitFor(() => expect(auth.doCreateUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password'));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  // Add more tests here as needed, for example, testing error handling, input validation, etc.
});
