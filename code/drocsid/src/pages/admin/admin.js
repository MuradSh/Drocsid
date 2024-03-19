import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Landing.css";
import "./admin.css";
import { useAuth } from "../../contexts/authContext"; // Adjust this path as necessary
import { doSignOut } from "../../firebase/auth";
import { firestore } from '../../firebase/firebase'; // Adjust this path as necessary
import { collection, getDocs } from 'firebase/firestore';

const pages = ["Analytics", "Events", "Users"];


const Admin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLoggedIn } = useAuth();
    const [pagez, setPagez] = useState("Analytics");
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(firestore, "events"));
            const itemsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllItems(itemsArray);
        };
        fetchItems().catch(console.error);
        console.log(allItems);
    }, []);


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
        setPagez(e.target.innerHTML);
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
                            {
                                allItems.length > 0 ?

                                    Object.keys(allItems[0]).map((key, index) => (
                                        <th key={index}>{key}</th>
                                    )) : null
                            }
                            <th>Actions</th>
                        </tr>
                        {
                            allItems.map((item, index) => (
                                <tr className="table-row" key={index}>
                                    {
                                        Object.keys(item).map((key, index) => (
                                            <td className="table-data" key={index}>{item[key]}</td>
                                        ))
                                    }
                                    <td>
                                        <button className="deleteButton">Delete</button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};


export default Admin;