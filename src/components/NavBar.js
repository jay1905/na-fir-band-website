import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <header className="nav-bar">
      <div className="logo">
        <h1>Ná Fir</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><a href="#facebook">Facebook</a></li>
          <li><a href="#twitter">Twitter</a></li>
          <li><a href="#itunes">iTunes</a></li>
          <li><a href="#instagram">Instagram</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
