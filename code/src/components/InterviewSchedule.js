import React, { useState } from 'react';
import './InterviewSchedule.css';

function InterviewSchedule({ onBack }) {
  const [rollNumber, setRollNumber] = useState('');
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(false);
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${rollNumber}`);
      if (!response.ok) {
        throw new Error('No interviews found for this roll number');
      }
      const data = await response.json();
      setInterviews(data);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setInterviews([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
  }

  return (
    <div className="interview-schedule">
      <button className="back-btn" onClick={onBack}>&larr; Back</button>
      {!searched && (
        <div className="welcome-message">
          <h2>Welcome!</h2>
          <p>Enter your roll number below to find your Anwesha Committee interview schedule.<br />
          You will see all your interview slots listed after searching.</p>
        </div>
      )}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && searched && <div className="error">{error}</div>}

      {interviews.length > 0 && searched && (
        <>
          <div className="result-message">
            <b>Here is your interview schedule!</b>
            <div className="good-luck">Best of luck! Dont miss the timings.</div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Committee</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview, index) => (
                  <tr key={index}>
                    <td>{interview.name}</td>
                    <td>{interview.rollNumber}</td>
                    <td>{interview.committeeName}</td>
                    <td>{formatDate(interview.date)}</td>
                    <td>{interview.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default InterviewSchedule; 