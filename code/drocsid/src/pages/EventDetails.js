import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from "../contexts/authContext";
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { doSignOut } from "../firebase/auth";
import "./EventDetails.css"; 

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const docRef = doc(firestore, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEventDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
<div className="event-details-container">
  <div className="event-details-header">
    <h2>{eventDetails.name}</h2>
  </div>
  <div className="event-details-section">
    <h3>Date</h3>
    <p>{eventDetails.date}</p>
  </div>
  <div className="event-details-section">
    <h3>Time</h3>
    <p>{eventDetails.time}</p>
  </div>
  <div className="event-details-section">
    <h3>Venue</h3>
    <p>{eventDetails.venue}</p>
  </div>
  <div className="event-details-section">
    <h3>Pricing</h3>
    <p>{eventDetails.pricing}</p>
  </div>
  <div className="event-details-section">
    <h3>Availability</h3>
    <p>{eventDetails.availability}</p>
  </div>
  <div className="center">
    {/* Assuming you have a button component or use a simple button */}
    <button className="button">Purchase Tickets</button>
  </div>
</div>

  );
};

export default EventDetails;
