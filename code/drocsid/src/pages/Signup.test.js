// SignUp.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './Signup';

describe('SignUp Component', () => {
  test('displays an error message when passwords do not match', async () => {
    render(<SignUp />);

    // Find the input elements
    const usernameInput = screen.getByPlaceholderText('User name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signupButton = screen.getByRole('button', {name: /sign up/i});

    // Simulate user typing into the input fields
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Try to submit the form without matching passwords
    fireEvent.click(signupButton);

    // Check for the alert message. This will need to be mocked if using Jest to suppress the error.
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    expect(alertMock).toHaveBeenCalledWith("Passwords don't match.");
    alertMock.mockRestore();
  });

  // Add more tests here for other functionalities, e.g., successful submission, validations, etc.
});
