import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';

// Dummy data for demonstration
const dummyUsers = [
  { id: '0xA1B2C3', score: 85, name: 'Manoj' },
  { id: '0xD4E5F6', score: 15, name: 'Rohit' },
  { id: '0xG7H8I9', score: 45, name: 'Sneha' },
  { id: '0xJ1K2L3', score: 10, name: 'Anita' },
];

const alertSoundUrl = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';

// Mock locations (lat, lon) corresponding to users
const mockLocations = [
  { lat: 28.6285212, lon: 77.4512834 },
  { lat: 19.0760, lon: 72.8777 },
  { lat: 12.9716, lon: 77.5946 },
  { lat: 22.5726, lon: 88.3639 }
];

const IDsPage = () => {
  const [trackedId, setTrackedId] = useState(null);
  const [sosId, setSosId] = useState(null);
  const [efirId, setEfirId] = useState(null);
  const audioRef = useRef(null);

  // Get maps URL for a user
  const getMapsUrlForUser = (userId) => {
    const index = dummyUsers.findIndex(u => u.id === userId);
    if (index === -1) return '';
    const loc = mockLocations[index % mockLocations.length];
    return `https://www.google.com/maps/@${loc.lat},${loc.lon},16z?entry=ttu`;
  };

  const handleTrack = (id) => {
    setTrackedId(id);
  };

  const handleSOS = (id) => {
    setSosId(id);
    setEfirId(id);

    // Play alarm sound
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const closeSOS = () => {
    setSosId(null);
    setEfirId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Keyboard listener for random SOS (key O)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'o') {
        const randomUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
        handleSOS(randomUser.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#fafbfc', minHeight: '100vh' }}>
      <NavBar title="Decentralised IDs" />
      <div style={{ padding: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px #0001' }}>
          <thead>
            <tr style={{ background: '#f5f6fa' }}>
              <th style={{ padding: '0.75rem' }}>User</th>
              <th>Decentralised ID</th>
              <th>Score</th>
              <th>Status</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map(user => {
              const dummyUserName = user.name.substring(0, 3) + '###';
              return (
                <tr key={user.id} style={{ background: user.score < 20 ? '#ffeaea' : undefined }}>
                  <td style={{ padding: '0.75rem', color: '#222', fontWeight: 'bold' }}>{dummyUserName}</td>
                  <td style={{ color: user.score < 20 ? '#d32f2f' : '#222', fontWeight: user.score < 20 ? 'bold' : 'normal' }}>{user.id}</td>
                  <td style={{ color: user.score < 20 ? '#d32f2f' : '#222', fontWeight: user.score < 20 ? 'bold' : 'normal' }}>{user.score}</td>
                  <td style={{ color: 'green', fontWeight: 'bold' }}>Live</td>
                  <td>
                    <button
                      style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', cursor: 'pointer' }}
                      onClick={() => handleTrack(user.id)}
                    >
                      Track
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Tracking modal */}
        {trackedId && (
          <div
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
            onClick={() => setTrackedId(null)}
          >
            <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, minWidth: 320 }} onClick={e => e.stopPropagation()}>
              <h4>Tracking ID: {trackedId}</h4>
              <p>Location and activity details would be shown here.</p>
              <p>
                View location: <a href={getMapsUrlForUser(trackedId)} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
              </p>
              <button
                onClick={() => setTrackedId(null)}
                style={{ marginTop: 16, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* SOS fullscreen alert triggered only by keypress */}
        {sosId && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#d32f2f', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <audio ref={audioRef} src={alertSoundUrl} autoPlay loop />
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>SOS ALERT!</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ID: {sosId}</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>eFIR has been automatically lodged for this user.</p>
            <p>
              View location: <a href={getMapsUrlForUser(sosId)} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </p>
            <button
              onClick={closeSOS}
              style={{ background: '#fff', color: '#d32f2f', border: 'none', borderRadius: 4, padding: '0.7rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 16 }}
            >
              Close Alert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDsPage;
