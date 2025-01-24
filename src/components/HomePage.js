import React from 'react';
import '../styles/HomePage.css';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div className="homepage">
      <NavBar />

      {/* Hero Image Section */}
      <div className="hero">
        <img 
          src="/images/na-fir-main.jpeg" 
          alt="Band image" 
          className="hero-image" 
        />
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <div className="card music">
          <h2>MUSIC</h2>
        </div>
        <div className="card tour-dates">
          <h2>TOUR DATES</h2>
        </div>
        <div className="card news-updates">
          <h2>NEWS UPDATES</h2>
        </div>
        <div className="card actions">
          <button>Email [Band Name]</button>
          <button>Book [Band Name]</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
