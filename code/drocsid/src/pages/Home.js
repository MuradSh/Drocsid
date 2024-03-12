import React, { useEffect, useState } from "react";
import "./Home.css"; // Ensure you update your CSS for a modern, clean look

const mockEvents = [
  { id: '1', name: 'The Phantom of the Opera', description: 'Experience the classic musical in an unforgettable performance.', category: 'Theater' },
  { id: '2', name: 'Rock on the Range', description: 'A weekend of rock music featuring top bands from around the world.', category: 'Concerts' },
  { id: '3', name: 'NBA Finals 2024', description: 'Watch the two top teams battle it out for the championship title.', category: 'Sports' },
  { id: '4', name: 'Hamilton', description: 'The story of America then, told by America now.', category: 'Theater' },
  { id: '5', name: 'Summer Music Festival', description: 'An outdoor festival featuring the best of pop, electronic, and indie music.', category: 'Concerts' },
  { id: '6', name: 'World Cup 2024 Qualifiers', description: 'See the national teams compete for a spot in the World Cup.', category: 'Sports' },
];

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Concerts", "Sports", "Theater"];

  useEffect(() => {
    const filteredItems = mockEvents.filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    );
    setItems(filteredItems);
  }, [selectedCategory]);

  return (
    <div className="home">
      <nav className="navbar"> {/* Add navigation content here */}</nav>
      <div className="category-filters">
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`filter-button ${selectedCategory === category ? "active" : ""}`}>
            {category}
          </button>
        ))}
      </div>
      <main className="event-listings">
        {items.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </div>
        ))}
      </main>
      <footer className="footer"> {/* Footer content */}</footer>
    </div>
  );
};

export default Home;
