import React, { useState } from 'react';
import './App.css';
import InterviewSchedule from './components/InterviewSchedule';
import Home from './Home';

function App() {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="App">
      {showSchedule ? (
        <InterviewSchedule onBack={() => setShowSchedule(false)} />
      ) : (
        <Home onStart={() => setShowSchedule(true)} />
      )}
    </div>
  );
}

export default App;
