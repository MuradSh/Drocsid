import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPass from '../pages/ResetPass';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Import and re-export everything
  useNavigate: () => jest.fn(), // Override useNavigate with a mock function
}));

describe('Reset Password Components', () => {

  it('Renders button and e-mail field', () => {
    render(<MemoryRouter>
      <ResetPass />
    </MemoryRouter>);

    expect(screen.getByPlaceholderText('e-mail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Verification/i })).toBeInTheDocument();

  });

  it('Allows input into e-mail field', () => {
    render(<MemoryRouter>
      <ResetPass />
    </MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('e-mail'), { target: { value: 'test@example.com' } });

    expect(screen.getByPlaceholderText('e-mail').value).toBe('test@example.com');
  });

  it("navigates back to sign-in page on button click", () => {
    const { getByText } = render(<ResetPass />);
    fireEvent.click(screen.getByText(/Back to Sign In/i));
  });

});
