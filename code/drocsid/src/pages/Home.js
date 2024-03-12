import React, { useEffect, useState } from 'react';
import './Home.css'; // Make sure you have this CSS file for styling
import { useAuth } from "../contexts/authContext";
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/firebase'; // Adjust the path as per your project structure
import { collection, getDocs, doc } from 'firebase/firestore';

const Home = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // State to store the fetched data
//   const events = doc(firestore, "events");

  useEffect(() => {
    // Navigate to login if user is not logged in
    if (!userLoggedIn) {
      navigate('/');
    } else {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(firestore, "events"));
            const itemsArray = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setItems(itemsArray);
          };
    
          fetchItems().catch(console.error);
    }
  }, [userLoggedIn, navigate]);

  const handleSignOut = async () => {
    try {
      await doSignOut();
      console.log("You've been signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Website!</h1>
        {userLoggedIn && (
          <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
        )}
      </header>
      <section className="home-content">
        <p>This is your go-to place for all things exciting and new. Explore our events:</p>
        {/* Displaying items from Firestore */}
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item">
              <h3>{item.name}</h3> {/* Adjust according to your data structure */}
              <p>{item.desc}</p> {/* Adjust according to your data structure */}
            </div>
          ))}
        </div>
      </section>
      <footer className="home-footer">
        <p>Contact us at <a href="mailto:info@example.com">info@example.com</a></p>
      </footer>
    </div>
  );
}

export default Home;