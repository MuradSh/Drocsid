import React, { useEffect, useState } from "react";
import "./Landing.css";
import Faqs from "./Faqs";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { doSignOut } from "../firebase/auth";

const faqsList = [
  {
    id: 0,
    questionText: "What types of events can I find on Drocsid?",
    answerText:
      "We offer a wide variety of events across many categories, including concerts, music festivals, sporting events, theater productions, comedy shows, workshops, conferences, and more. Use our search filters to explore specific categories or find events happening near you.",
  },
  {
    id: 1,
    questionText: "How do I know the events listed are legitimate?",
    answerText:
      "Our platform prioritizes user safety and trust. All events are reviewed and verified by our admin team before being published.",
  },
  {
    id: 2,
    questionText: "How can I get help if I have questions or encounter issues?",
    answerText:
      "We're here to help! If you have any questions or encounter issues while using our platform, you can email us at muradshahmammadli@gmai.com",
  },
  {
    id: 3,
    questionText: "Do you have a mobile app for purchasing tickets?",
    answerText:
      "While we don't currently offer a dedicated mobile app, our platform is fully optimized for mobile browsing. You can easily search for events, view details, and purchase tickets directly from your mobile device's web browser.",
  },
];

const Landing = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Concerts", "Sports", "Theater"];
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(firestore, "events"));
      const itemsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllItems(itemsArray);
      setEmail(sessionStorage.getItem("email"));
      setFilteredItems(itemsArray);
    };

    fetchItems().catch(console.error);
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    // get notifications
    const fetchNotifications = async () => {
      const querySnapshot = await getDocs(collection(firestore, "notifications"));
      const notificationsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsArray.length);
    }
    fetchNotifications().catch(console.error);
  }, []);

  useEffect(() => {
    const filtered = allItems.filter((item) => {
      return (
        (selectedCategory === "All" || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, allItems]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Navigate to login if user is not logged in
    if (!userLoggedIn) {
      navigate("/");
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

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigate to event details page with the event's ID
  };

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
              {
                email == "admin@gmail.com" ? <a className="nav-link" href="/admin">Admin</a> : null
              }

              {
                <a className="nav-link" href="/organizer">Organizer</a>
              }
              <a className="nav-link active-link" href="/event-status">
                Profile
              </a>
              <a className="nav-link" href="/userProfile">
                Bookings
              </a>
              <a className="nav-link" href="/notifications">
                {
                  notifications > 0 ? <span class="notification-count">{notifications}</span> : null
                }
                Notifications
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

      <section className="hero-section">
        <div className="hero-img-container">
          <img src="Saly-1.png" alt="" />
        </div>
        <div className="hero-text-container">
          <div className="hero-text">
            <span>Event Ticketing</span>
          </div>
          <p className="hero-subtext">
            Unleash your event-going experience! Find unforgettable events happening near you, from heart-pounding concerts to captivating theater shows. Explore a diverse range of categories, discover hidden gems, and book your tickets effortlessly through our secure platform. Get ready to create lasting memories – your next adventure awaits!
          </p>
        </div>
      </section>

      <section className="info-section" data-testid="hero-section">
        <div className="search-background">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search events"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="search-piece">
            <div className="category-browsing">
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-button ${selectedCategory === category ? "active" : ""
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="event-listings">
                {filteredItems
                  .filter(event => event.verified) // Only include verified events
                  .map(event => (
                    <div
                      key={event.id}
                      className="event-card"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <h3>{event.name}</h3>
                      <p>{event.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="info-piece">
          <div className="info-text">
            <p>Find exciting events near you and book tickets effortlessly.</p>
            <div className="discover-btn">Learn more</div>
          </div>
          <div className="info-img-container">
            <img src="Saly-2.png" alt="" className="info-img"></img>
          </div>
        </div>

        <div className="info-piece">
          <div className="info-text">
            <p>Our secure platform makes buying tickets a breeze. Choose your preferred payment method and get instant confirmation.</p>
            <div className="discover-btn">Learn more</div>
          </div>
          <div className="info-img-container">
            <img src="Saly-31.png" alt="" className="info-img"></img>
          </div>
        </div>

        <div className="info-piece">
          <div className="info-text">
            <p>Plan your next adventure with ease. Browse upcoming verified events, discover new experiences, and create lasting memories.</p>
            <div className="discover-btn">Learn more</div>
          </div>
          <div className="info-img-container">
            <img src="Saly-3.png" alt="" className="info-img"></img>
          </div>
        </div>
      </section>
      <Faqs faqsList={faqsList} />
    </div>
  );
};

export default Landing;
