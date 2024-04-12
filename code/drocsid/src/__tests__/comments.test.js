import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comments from '../pages/Comments';

describe('Comments Component', () => {
    const eventId = 'testEventId';

    test('renders textarea and post button', () => {
        render(<Comments eventId={eventId} />);

        expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
        expect(screen.getByText('Post Comment')).toBeInTheDocument();
    });

    test('allows user to enter text in the textarea', () => {
        render(<Comments eventId={eventId} />);

        const textarea = screen.getByPlaceholderText('Add a comment...');
        fireEvent.change(textarea, { target: { value: 'This is a test comment' } });
        expect(textarea.value).toBe('This is a test comment');
    });
});