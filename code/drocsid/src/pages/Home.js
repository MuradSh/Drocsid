import React, { useEffect, useState } from "react";
import "./Home.css"; // Ensure your CSS file is correctly linked for styling
import { useAuth } from "../contexts/authContext"; // Adjust this path to where your AuthContext is located
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase/firebase'; // Adjust this path to where your Firebase config is initialized
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]); // Use to store all fetched items
  const [filteredItems, setFilteredItems] = useState([]); // Use to store items after applying category filter
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Concerts", "Sports", "Theater"];

  useEffect(() => {
    // Redirect if not logged in
    if (!userLoggedIn) {
      navigate('/');
      return;
    }

    // Fetch items from Firestore
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(firestore, "events"));
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllItems(itemsArray); // Store fetched items
    };

    fetchItems().catch(console.error);
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    // Filter items based on selected category
    const filteredItems = allItems.filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    );
    setFilteredItems(filteredItems); // Update state with filtered items
  }, [selectedCategory, allItems]);

  return (
    <div className="home">
      <nav className="navbar"> {/* Your navigation content here */}</nav>
      <div className="category-filters">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => setSelectedCategory(category)}
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <main className="event-listings">
        {filteredItems.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            {/* Include event.date if your data contains it */}
          </div>
        ))}
      </main>
      <footer className="footer"> {/* Footer content here */}</footer>
    </div>
  );
};

export default Home;
