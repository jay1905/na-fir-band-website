import React from "react";
import "../styles/MusicBox.css";

const MusicBox = () => {
  return (
    <div className="music-box">
      <span className="music-text">MUSIC</span>
      <div className="side-dot left-dot">◆</div>
      <div className="side-dot right-dot">◆</div>
    </div>
  );
};

export default MusicBox;
