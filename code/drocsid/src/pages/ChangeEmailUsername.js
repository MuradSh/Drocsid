import "./ChangeEmailUsername.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore,auth } from '../firebase/firebase';
import { collection, updateDoc, query, getDoc,getDocs, where,doc, } from 'firebase/firestore';

function ChangeEmailUsername() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if ((email && confEmail) && (email !== confEmail)){

        }
        if (((email && confEmail) && (email == confEmail)) || username) {
            
            const currentUserData = await getCurrentUserData();
    
            if (((email && confEmail) && (email == confEmail)) && email !== currentUserData.email) {
                await updateFirestoreField("email", currentUserData.email,email);
            }
    
            
            if (username && username !== currentUserData.username) {
                await updateFirestoreField("username", currentUserData.username,username);
            }
    
            window.alert("Credentials updated successfully.");
            navigate("/landing");

        } 
        
        else {

            window.alert("Please enter a valid username or password.");
            console.log("Empty fields");
        }
    };

    const getCurrentUserData = async () => {
        try {
            const oldEmail = auth.currentUser.email;
            const q = query(collection(firestore,"users"), where("email", "==", oldEmail));
            
            const docSnap = await getDocs(q);
            if (!docSnap.empty) {
                const userData = docSnap.docs[0].data();
                console.log(userData.email);
                console.log(userData.username);
                return { email: userData.email, username: userData.username };
            } else {
                console.log("Does not exist");
                return { email: "", username: "" };
            }
        } 
        catch (error) {
            console.error("Error:", error);
            return { email: "", username: "" };
        }
    };

    const updateFirestoreField = async (fieldName, oldValue, newValue) => {
        try {

            const col = collection(firestore, "users");
            const queryy = query(col, where(fieldName, "==", oldValue));
            const querySnapshot = await getDocs(queryy);

            if (!querySnapshot.empty) {
                const userRef = querySnapshot.docs[0].ref;
                await updateDoc(userRef, { [fieldName]: newValue });
                console.log("Updated successfully");
            } 
            
            else {
                console.log("Not found");
            }
        } 
        
        catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="main">
          <div className="changeemailusername">
            <form onSubmit={handleSubmit}>
                <div className="txt">
                    <label>Change User Credentials</label>
                </div>
                <div className="subtxt">
                    <label>New Username</label>
                </div>
                <input
                    type="username"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(x) => setUsername(x.target.value)}
                /> 

                <div className="subtxt">
                    <label>New Email</label>
                </div>
                <input
                    type="email"
                    name="e-mail"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="email"
                    name="e-mail"
                    placeholder="confirm e-mail"
                    value={confEmail}
                    onChange={(y) => setConfEmail(y.target.value)}
                />

                <input type="submit" value="Confirm Change" className="buttn" />
            </form>
          </div>
        </div>
      );

}

export default ChangeEmailUsername;