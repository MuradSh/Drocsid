import React, { useEffect, useState } from "react";
import Faqs from "./Faqs";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doSignOut } from "../firebase/auth";
import "./Landing.css";
import "./admin/admin.css";
import "./Organizer.css";

const Organizer = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        var email = sessionStorage.getItem("email");
        const fetchEvents = async () => {
            const eventsRef = collection(firestore, "events");
            const q = query(eventsRef, where("organizer", "==", email));

            const querySnapshot = await getDocs(q);
            const eventsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(eventsArray);
            setEvents(eventsArray);
        }
        fetchEvents().catch(console.error);
    }, []);

    return (
        <div className="organizerWrap">
            <nav className="navbar" id="navMenu" data-testid="navMenu">
                <div className="container">
                    <div className="navbar-title">
                        <a className="navbar-brand" href="/landing">
                            Home
                        </a>
                    </div>

                    <div className="nav-links" id="navbarNav">
                        <div className="navbar-nav nav-primary">
                            <a className="nav-link active-link" href="/landing">
                                Home
                            </a>
                            <a className="nav-link" href="/create-event">
                                Create an event
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <table className="eventsTable">
                <thead>
                    <tr className="table-header">
                        <th scope="col">Event Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Verified</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className="table-row">
                            <td className="table-data">{event.name}</td>
                            <td className="table-data">{event.date}</td>
                            <td className="table-data">{event.category}</td>
                            <td className="table-data">{event.status}</td>
                            <td className="table-data">{event.venue}</td>
                            <td className="table-data">{event.verified ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Organizer;