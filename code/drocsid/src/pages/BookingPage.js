import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, runTransaction } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import './BookingPage.css'; // Ensure you have the CSS file for styling

const BookingPage = () => {
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1); // Default to one ticket
  const navigate = useNavigate();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // Dummy booking logic for demonstration

    // On success, navigate to a confirmation page or show a success message
    navigate('/booking-success'); // Example redirect to a success page

    const eventRef = doc(firestore, "events", eventId);
    // Assume you have a field "availability" in your event document
    await runTransaction(firestore, async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      if (!eventDoc.exists()) {
        throw new Error("Document does not exist!");
      }
  
      const newAvailability = eventDoc.data().availability - ticketQuantity;
      transaction.update(eventRef, { availability: newAvailability });
    });
  };

  return (
    <div className="booking-form-container">
      <h2>Book Your Tickets</h2>
      <form onSubmit={handleBookingSubmit}>
        <div className="ticket-quantity-section">
          <div className="number-input-container">
            <input
              id="ticketQuantity"
              type="number"
              min="1"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(Number(e.target.value))}
            />
            <button 
              type="button" // Specify the button type as button to prevent form submission
              className="increment-btn" 
              onClick={(e) => {
                e.preventDefault(); // Prevent the form submission
                setTicketQuantity(prevQuantity => prevQuantity + 1);
              }}
            >
              +
            </button>
            <button 
              type="button" // Similarly, prevent form submission for the decrement button
              className="decrement-btn" 
              onClick={(e) => {
                e.preventDefault();
                setTicketQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Ensure ticket quantity does not go below 1
              }}
            >
              -
            </button>
          </div>
        </div>
        <button type="submit" className="confirm-booking-btn">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
