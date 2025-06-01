import React from 'react';
import './Home.css';

function Home({ onStart }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-glow">🦉</div>
        <h1 className="home-title">Anwesha Interview Scheduler</h1>
        <p className="home-desc">
          Welcome to the Anwesha Committee Interview Schedule Finder.<br/>
          Enter your roll number and instantly discover your interview slots for all committees.<br/>
          <span className="cult-highlight">Best of luck, Meet you in the interviews!</span>
        </p>
        <button className="start-btn" onClick={onStart}>Find My Schedule</button>
      </div>
    </div>
  );
}

export default Home; 