import React, { useEffect, useState } from 'react';
import { useAuth } from "../contexts/authContext"; // Ensure this is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import './UserProfile.css'

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser) {
        const q = query(collection(firestore, "bookings"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => doc.data());
        setBookings(bookingsData);
      }
    };

    fetchBookings();
  }, [currentUser]);

  if (!currentUser) return <div>Please login to see your bookings.</div>;

  return (
    <div className="user-profile-container">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>Event: {booking.eventName} - Tickets: {booking.tickets}</li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserProfile;
