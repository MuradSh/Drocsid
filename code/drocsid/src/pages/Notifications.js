import "./Landing.css";
import "./Notifications.css";
import "./admin/admin.css";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const Notifications = () => {


    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const fetchNotifications = async () => {
            const querySnapshot = await getDocs(collection(firestore, "notifications"));
            const notificationsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            for (let i = 0; i < notificationsArray.length; i++) {
                if (!notificationsArray[i].seen) {
                    updateSeen(notificationsArray[i].id);
                }
            }
            setNotifications(notificationsArray);
            console.log(notificationsArray);
        }

        fetchNotifications().catch(console.error);

    }, []);

    const updateSeen = async (id) => {
        const notificationRef = doc(firestore, "notifications", id);
        await updateDoc(notificationRef, {
            seen: true,
        });
    }

    return (
        <div className="notificationsRoot">
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
            <table className="eventsTable">
                <thead>
                    <tr className="table-header">
                        <th scope="col">Decision</th>
                        <th scope="col">Event ID</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
                        <tr className="table-row" key={notification.id}>
                            <td className="table-data">{notification.decision ? "Approved" : "Rejected"}</td>
                            <td className="table-data">{notification.event_id}</td>
                            <td className="table-data">{new Date(notification.time * 27).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Notifications;