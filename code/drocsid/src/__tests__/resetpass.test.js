import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPass from '../pages/ResetPass';
import '@testing-library/jest-dom/extend-expect';

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
  
});