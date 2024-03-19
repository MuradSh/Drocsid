
import Landing from '../pages/Landing';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import YourComponent from './YourComponent'; // Update with the actual import path

// Mock data for categories and events
const categories = ["All", "Concerts", "Sports", "Theater"];
const events = [
  { id: 1, name: 'Concert Event', description: 'A great concert', category: 'Concerts' },
  { id: 2, name: 'Sport Event', description: 'An exciting match', category: 'Sports' },
  { id: 3, name: 'Theater Event', description: 'A captivating play', category: 'Theater' },
];

describe('<YourComponent />', () => {
  it('renders all category buttons', () => {
    render(<YourComponent categories={categories} events={events} />);
    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('updates the selected category upon button click', () => {
    render(<YourComponent categories={categories} events={events} />);
    const concertsButton = screen.getByRole('button', { name: 'Concerts' });
    fireEvent.click(concertsButton);
    expect(concertsButton).toHaveClass('active');
  });

  it('renders event cards based on the selected category', async () => {
    render(<YourComponent categories={categories} events={events} />);
    
    // Initially, 'All' category is selected, so all events should be rendered
    events.forEach(event => {
      expect(screen.getByText(event.name)).toBeInTheDocument();
    });

    // Click on 'Sports' category
    fireEvent.click(screen.getByRole('button', { name: 'Sports' }));

    // Now, only the 'Sport Event' should be visible
    expect(screen.getByText('Sport Event')).toBeInTheDocument();
    expect(screen.queryByText('Concert Event')).not.toBeInTheDocument();
    expect(screen.queryByText('Theater Event')).not.toBeInTheDocument();
  });

  // Add more tests as needed...
});
