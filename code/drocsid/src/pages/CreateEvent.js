import React, { useState } from 'react';
import { firestore, auth } from "../firebase/firebase";
import { addDoc, collection } from 'firebase/firestore';
import './CreateEvent.css'; // Ensure this path matches the location of your CSS file
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        name: '',
        category: '',
        date: '',
        time: '',
        venue: '',
        description: '',
        pricing: '',
        availability: 0,
        verified: false, // Initially false, to be verified by an admin
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure the user is logged in before attempting to create an event
        if (!auth.currentUser) {
            alert("You must be logged in to create an event.");
            return;
        }
        const organizerId = auth.currentUser.uid; // Get the current user's UID

        try {
            var email = sessionStorage.getItem("email");
            await addDoc(collection(firestore, 'events'), {
                ...eventData,
                organizerId, // Include the organizer's UID
                organizer: email, // Include the organizer's email
                status: 'Pending Approval'
            });
            alert('Event created successfully and is awaiting admin approval.');
            navigate('/landing'); // Redirect to landing page
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event. Please try again.');
        }
    };


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>Create Event</h2>
                </div>
                <div className="form-section">
                    <input
                        className="form-input"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        placeholder="Event Name"
                        required
                    />
                    <input
                        className="form-input"
                        name="category"
                        value={eventData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        required
                    />
                    <input
                        className="form-input"
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        placeholder="Date"
                        required
                    />
                    <input
                        className="form-input"
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        placeholder="Time"
                        required
                    />
                    <input
                        className="form-input"
                        name="venue"
                        value={eventData.venue}
                        onChange={handleChange}
                        placeholder="Venue"
                        required
                    />
                    <textarea
                        className="form-input"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <input
                        className="form-input"
                        name="pricing"
                        value={eventData.pricing}
                        onChange={handleChange}
                        placeholder="Pricing"
                        required
                    />
                    <input
                        className="form-input"
                        type="number"
                        name="availability"
                        value={eventData.availability}
                        onChange={handleChange}
                        placeholder="Availability"
                        required
                    />
                </div>
                <div className="center">
                    <button type="submit" className="button">Submit Event</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
