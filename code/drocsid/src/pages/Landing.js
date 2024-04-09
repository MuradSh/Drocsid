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
    questionText: "Lorem ipsum dolor sit amet?",
    answerText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.",
  },
  {
    id: 1,
    questionText: "Lorem ipsum dolor sit amet?",
    answerText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.",
  },
  {
    id: 2,
    questionText: "Lorem ipsum dolor sit amet?",
    answerText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.",
  },
  {
    id: 3,
    questionText: "Lorem ipsum dolor sit amet?",
    answerText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.",
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
                sessionStorage.getItem("organizer") == 'true' ? <a className="nav-link" href="/organizer">Organizer</a> : null
              }
              <a className="nav-link active-link" href="/event-status">
                Profile
              </a>
              <a className="nav-link" href="/userProfile">
                Bookings
              </a>
              <a className="nav-link" href="/userProfile">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            lacus purus, vehicula et justo ut, lobortis aliquet leo. Nulla ac
            justo eget odio rhoncus suscipit quis vel ligula. Aliquam cursus
            iaculis velit. Curabitur posuere venenatis quam, vel venenatis nulla
            euismod at. Donec consectetur justo quis tellus elementum egestas.
            Mauris orci nisl, lobortis et sagittis nec, cursus id felis. Cras
            sodales ullamcorper enim non interdum. In fringilla augue a posuere
            volutpat.
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <div className="discover-btn">Learn more</div>
          </div>
          <div className="info-img-container">
            <img src="Saly-2.png" alt="" className="info-img"></img>
          </div>
        </div>

        <div className="info-piece">
          <div className="info-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <div className="discover-btn">Learn more</div>
          </div>
          <div className="info-img-container">
            <img src="Saly-31.png" alt="" className="info-img"></img>
          </div>
        </div>

        <div className="info-piece">
          <div className="info-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
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