import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Landing.css";
import "./admin.css";
import { useAuth } from "../../contexts/authContext"; // Adjust this path as necessary
import { doSignOut } from "../../firebase/auth";
import { firestore } from '../../firebase/firebase'; // Adjust this path as necessary
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc, where, query } from 'firebase/firestore';

const pages = ["Pending Decision", "All Events", "Users"];


const Admin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLoggedIn } = useAuth();
    const [pagez, setPagez] = useState("Analytics");
    const [showingElements, setShowingElements] = useState([]);
    const [allElements, setAllElements] = useState([]);
    const [pendingElements, setPendingElements] = useState([]);

    useEffect(() => {
        fetchItems().catch(console.error);
        if (window.location.hash != "") {
            changePage(window.location.hash);
        }
    }, []);



    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(firestore, "events"));
        var pendingItemsArray = [];
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            if (querySnapshot.docs[i].data().verified == null) {
                pendingItemsArray.push({
                    id: querySnapshot.docs[i].id,
                    ...querySnapshot.docs[i].data(),
                });
            }
        }
        setPendingElements(pendingItemsArray);
        const querySnapshot2 = await getDocs(collection(firestore, "events"));
        var allItemsArray = querySnapshot2.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAllElements(allItemsArray);
        setShowingElements(pendingItemsArray);
    };

    // changin page from left bar
    const changePage = (page) => {
        setPagez(page);
        if (page == "#pen") {
            setShowingElements(pendingElements);
        } else if (page == "#all") {
            setShowingElements(allElements);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("loginTime", new Date().getTime());
            console.log("Login successful", { email });
            navigate("/landing");
        } catch (error) {
            console.error("Login failed", error);
        }
    };


    const handleSignOut = async () => {
        try {
            await doSignOut();
            console.log("You've been signed out successfully.");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleLiClick = (e) => {
        var page = e.target.innerHTML.substring(0, 3).toLowerCase();
        changePage("#" + page);
        window.location.hash = page;
    }

    const handleDelete = async (e) => {
        var id = e.target.getAttribute("data-id");

        const eventDocRef = doc(firestore, 'events', id);
        await deleteDoc(eventDocRef);
        fetchItems(); // Refresh the list after deletion
    }

    const handleDecision = async (decision, id) => {
        const eventDocRef = doc(firestore, 'events', id);
        await updateDoc(eventDocRef, {
            verified: decision
        });

        fetchItems(); // Refresh the list after checkbox change

        await addDoc(collection(firestore, 'notifications'), {
            seen: false,
            event_id: id,
            time: new Date(),
            decision: decision
        });
        alert("Decision has been made!");
    }

    return (
        <div className="adminWrapper">
            <nav className="navbar" id="navMenu" data-testid="navMenu">
                <div className="container">
                    <div className="navbar-title">
                        <a className="navbar-brand" href="/landing">
                            drocsid
                        </a>
                    </div>


                    <div className="nav-links" id="navbarNav">
                        <div className="navbar-nav nav-primary">
                            {
                                email == "admin@gmail.com" ? <a className="nav-link" href="/admin">Admin</a> : null
                            }
                            <a className="nav-link active-link" href="/landing">
                                Option 1
                            </a>
                            <a className="nav-link" href="/landing">
                                Option 2
                            </a>
                            <a className="nav-link">
                                {userLoggedIn && (
                                    <button onClick={handleSignOut} className="sign-out-button">
                                        Sign Out
                                    </button>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="leftBar">
                <ul>
                    {pages.map((page, index) => (
                        <li key={index} onClick={handleLiClick}>{page}</li>
                    ))}
                </ul>
            </div>
            <div className="bodyWrapper">
                <table className="eventsTable">
                    <tbody>

                        <tr className="table-header">
                            <th>id</th>
                            <th>category</th>
                            <th>date</th>
                            <th>venue</th>
                            <th>name</th>
                            <th>availability</th>
                            <th>description</th>
                            <th>pricing</th>
                            <th>time</th>
                            <th>Actions</th>
                        </tr>
                        {
                            showingElements.map((item, index) => (
                                < tr className="table-row" key={index} >
                                    <td className="table-data">{item.id}</td>
                                    <td className="table-data">{item.category}</td>
                                    <td className="table-data">{item.date}</td>
                                    <td className="table-data">{item.venue}</td>
                                    <td className="table-data">{item.name}</td>
                                    <td className="table-data">{item.availability}</td>
                                    <td className="table-data">{item.description}</td>
                                    <td className="table-data">{item.pricing}</td>
                                    <td className="table-data">{item.time}</td>
                                    < td >
                                        <button className="approveButton" onClick={() => handleDecision(true, item.id)}>Approve</button>
                                        <button className="rejectButton" onClick={() => handleDecision(false, item.id)}>Reject</button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div >
        </div >
    );
};


export default Admin;