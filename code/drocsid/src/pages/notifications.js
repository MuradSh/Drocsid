import "./Landing.css";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Notifications = () => {


    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const fetchNotifications = async () => {
            const querySnapshot = await getDocs(collection(firestore, "notifications"));
            const notificationsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(notificationsArray);
        }

        fetchNotifications().catch(console.error);
    }, []);

    return (
        <div>
            <nav className="navbar" id="navMenu" data-testid="navMenu">
                <div className="container">
                    <div className="navbar-title">
                        <a className="navbar-brand" href="/landing">
                            Drocsid
                        </a>
                    </div>

                    <div className="nav-links" id="navbarNav">
                        <div className="navbar-nav nav-primary">
                            <a className="nav-link active-link" href="/event-status">
                                Profile
                            </a>
                            <a className="nav-link" href="/userProfile">
                                Bookings
                            </a>
                            <a className="nav-link" href="/notifications">
                                Notifications
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Notification</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.id}>
                            <td>{notification.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Notifications;