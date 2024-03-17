import React from "react";
import "./Landing.css";
import Faqs from "./Faqs";

const faqsList = [
  {
    id: 0,
    questionText: 'Lorem ipsum dolor sit amet?',
    answerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.',
  },
  {
    id: 1,
    questionText: 'Lorem ipsum dolor sit amet?',
    answerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.',
  },
  {
    id: 2,
    questionText: 'Lorem ipsum dolor sit amet?',
    answerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.',
  },
  {
    id: 3,
    questionText: 'Lorem ipsum dolor sit amet?',
    answerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi. Sed id semper nunc. Sed euismod, urna ac aliquet ultricies, nunc nisl tincidunt nunc, nec tincidunt nisl nunc auctor nunc. Nulla facilisi.',
  },
];

const Landing = () => {
  return (
    <div>
      <nav className="navbar" id="navMenu" data-testid="navMenu">
        <div className="container">
          <div className="navbar-title">
            <a className="navbar-brand" href="index.html">
              drocsid
            </a>
          </div>

          <div className="nav-links" id="navbarNav">
            <div className="navbar-nav nav-primary">
              <a className="nav-link active-link" href="/">
                Option 1
              </a>
              <a className="nav-link" href="/">
                Option 2
              </a>
              <a className="nav-link" href="/">
                Option 3
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
