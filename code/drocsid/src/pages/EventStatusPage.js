import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import './EventStatusPage.css';
import "./ChangeEmailUsername.js";

const EventStatusPage = () => {
    const [events, setEvents] = useState([]);
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const handleCredentialsChange = () => {
        navigate("/changecredentials");
    };

    useEffect(() => {
        const fetchEvents = async () => {
            if (!currentUser) return;

            // 'organizerId' field links events to users.
            const q = query(collection(firestore, "events"), where("organizerId", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            const fetchedEvents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            setEvents(fetchedEvents);
        };

        fetchEvents();
    }, [currentUser]);

    return (
        <div className="event-status-container">
        <div className="event-status-header">
            <h2>Your Events</h2>
        </div>
        <ul className="event-list">
            {events.map(event => (
                <li key={event.id} className="event-list-item">
                    <span className="event-name">{event.name}</span> - Status: 
                    <span className={`event-status ${event.verified ? 'status-approved' : 'status-pending'}`}>
                        {event.verified ? 'Approved' : 'Pending'}
                    </span>
                </li>
            ))}
        </ul>

        <button className="buttn" onClick={handleCredentialsChange}>Change User Credentials</button>

    </div>

    );
};

export default EventStatusPage;
