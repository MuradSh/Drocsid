import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, runTransaction } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import './BookingPage.css'; 
import { getAuth } from 'firebase/auth';


const BookingPage = () => {
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1); // Default to one ticket
  const navigate = useNavigate();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
  
 
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;
  
    if (!userId) {
      console.error("User not logged in");
      return;
    }
  
    const eventRef = doc(firestore, "events", eventId);
  
    // Update event's available tickets and create a booking record
    await runTransaction(firestore, async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      if (!eventDoc.exists()) {
        throw new Error("Document does not exist!");
      }
  
      const newAvailability = eventDoc.data().availability - ticketQuantity;
  
      // Only proceed if there are enough tickets available
      if (newAvailability >= 0) {
        transaction.update(eventRef, { availability: newAvailability });
        // Create a new booking record
        const bookingRef = doc(collection(firestore, "bookings"));
        transaction.set(bookingRef, {
          userId, 
          eventId,
          eventName: eventDoc.data().name, // Assuming event document has a 'name' field
          tickets: ticketQuantity,
          bookingDate: new Date(), // Current date and time of the booking
          status: "confirmed"
        });
      } else {
        // Handle the case where not enough tickets are available
        throw new Error("Not enough tickets available.");
      }
    });
  
    navigate('/booking-success');
  };
  
  

  return (
    <div className="booking-form-container">
      <h2>Book Your Tickets</h2>
      <form onSubmit={handleBookingSubmit}>
        <div className="ticket-quantity-section">
          <div className="number-input-container">
          <label htmlFor="ticketQuantity">Ticket Quantity</label>
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
