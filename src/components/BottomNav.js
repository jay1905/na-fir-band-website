import React from "react";
import "../styles/BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item music">
        <span>MUSIC</span>
      </div>
      <div className="nav-item tour">
        <span>TOUR DATES</span>
      </div>
      <div className="news-updates">
        <span>— NEWS UPDATES ➤</span>
      </div>
      <div className="buttons">
        <button className="email">EMAIL KEELAN</button>
        <button className="book">BOOK KEELAN</button>
      </div>
    </div>
  );
};

export default BottomNav;
