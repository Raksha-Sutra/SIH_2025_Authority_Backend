import React, { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import alarmSound from "../assets/a.mp3"; // Import the audio file
import L from 'leaflet';

const dummyUsers = [
  { id: '0xA1B2C3883JSU', score: 89, name: 'Ravindra', emc: '9876543210', date: '2025-09-27', sosPressed: true, efirRegistered: true, lat: 26.0925, lng: 94.259 },
  { id: '0xB2C3D4992KLM', score: 15, name: 'Ravleen', emc: '9812345678', date: '2025-09-01', sosPressed: false, efirRegistered: false, lat: 26.095, lng: 94.26 },
  { id: '0xC3D4E5111NOP', score: 46, name: 'Ravish', emc: '9834567890', date: '2025-09-26', sosPressed: true, efirRegistered: false, lat: 26.096, lng: 94.261 },
];

const maskName = (name) => name[0] + name.slice(1).replace(/./g, '*');
const maskEmc = (emc) => emc.slice(0, 2) + '********';

function DistrictHeatmap() {
  const map = useMap();
  useMemo(() => {
    if (!map) return;
    const greenZone = [[26.092, 94.257],[26.093, 94.258],[26.0915, 94.259]];
    const redZone = [[26.095, 94.26],[26.096, 94.261],[26.0955, 94.262]];
    const heatPoints = [...greenZone.map(p => [...p, 0.3]), ...redZone.map(p => [...p, 1.0])];
    const heatLayer = L.heatLayer(heatPoints, { radius: 40, blur: 25, gradient: {0.2:'green',0.5:'yellow',1.0:'red'}, maxZoom:17 });
    heatLayer.addTo(map);
    return () => map.removeLayer(heatLayer);
  }, [map]);
  return null;
}

export default function Home() {
  const [trackedUser, setTrackedUser] = useState(null); // User whose SOS overlay is open
  const [users, setUsers] = useState(dummyUsers);

  useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key.toLowerCase() === 'o') {
      // Pick the first user with SOS pressed as demo
      const sosUser = users.find(u => u.sosPressed);
      if (sosUser) {
        setTrackedUser(sosUser);
        // Play SOS sound
      let audio;
      audio = new Audio(alarmSound);
    //   audio.loop = true; // loop until modal closes
      audio.play().catch(err => console.log("Audio play error:", err));
    }
    }
  };
    window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [users]);
  const handleEfir = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, efirRegistered: true } : u));
    alert(`eFIR registered for ${id}`);
  };

  const restrictedAreas = [
    { center: [26.089, 94.255], radius: 150, label: 'Restricted Area 1' },
    { center: [26.098, 94.264], radius: 150, label: 'Restricted Area 2' }
  ];

  return (
    <div style={{ padding: '2rem', paddingTop: '5rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#1976d2' }}>Tourism & Police Dashboard - Wokha District</h2>

      {/* Summary */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['Total Users', 'SOS Pressed', 'E-FIR Registered'].map((title, idx) => {
          let value;
          if (title === 'Total Users') value = users.length;
          else if (title === 'SOS Pressed') value = users.filter(u => u.sosPressed).length;
          else value = users.filter(u => u.efirRegistered).length;
          return (
            <div key={idx} style={{ background: '#f0f2f5', padding: '0.75rem 1rem', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: '1 1 150px', textAlign: 'center' }}>
              <strong>{title}</strong>
              <div style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{value}</div>
            </div>
          );
        })}
      </div>

      {/* Map */}
      <MapContainer center={[26.0925, 94.259]} zoom={14} scrollWheelZoom style={{ height: 450, width: '100%', borderRadius: 8, marginBottom: '2rem' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        <DistrictHeatmap />
        {restrictedAreas.map((area, idx) => (
          <Circle key={idx} center={area.center} radius={area.radius} pathOptions={{ color: 'red', fillColor: '#f03', fillOpacity: 0.3 }}>
            <Tooltip>{area.label}</Tooltip>
          </Circle>
        ))}
      </MapContainer>

      {/* Users table */}
      <div style={{ padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px #0001' }}>
          <thead>
            <tr style={{ background: '#f5f6fa' }}>
              <th style={{ padding: '0.75rem' }}>Decentralised ID</th>
              <th>Score</th>
              <th>Name</th>
              <th>EMC</th>
              <th>Date</th>
              <th>Track</th>
              <th>SOS</th>
              <th>eFIR</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ background: user.score < 20 ? '#ffeaea' : undefined }}>
                <td style={{ padding: '0.75rem', color: user.score < 20 ? '#d32f2f' : '#222', fontWeight: user.score < 20 ? 'bold' : 'normal' }}>{user.id}</td>
                <td style={{ color: user.score < 20 ? '#d32f2f' : '#222', fontWeight: user.score < 20 ? 'bold' : 'normal' }}>{user.score}</td>
                <td>{maskName(user.name)}</td>
                <td>{maskEmc(user.emc)}</td>
                <td>{user.date || '-'}</td>
                <td>
                  {user.sosPressed ? (
                    <button
                      onClick={() => setTrackedUser(user)}
                      style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', cursor: 'pointer' }}
                    >
                      Track
                    </button>
                  ) : <span style={{ color: '#888', fontStyle: 'italic' }}>No Access</span>}
                </td>
                <td style={{ color: user.sosPressed ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>{user.sosPressed ? 'Pressed' : 'Not Pressed'}</td>
                <td>
                  <button onClick={() => handleEfir(user.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', cursor: 'pointer' }}>
                    {user.efirRegistered ? 'View PDF' : 'No Fir'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full-screen SOS overlay */}
      {trackedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, width: '90%', maxWidth: 500, textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', color: '#d32f2f' }}>Emergency Alert!</h2>
            <p><strong>ID:</strong> {trackedUser.id}</p>
            <p><strong>Name:</strong> {trackedUser.name}</p>
            <p><strong>Contact:</strong> {trackedUser.emc}</p>

            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${trackedUser.lat},${trackedUser.lng}`, '_blank')}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Open in Google Maps
            </button>

            <button
              onClick={() => setTrackedUser(null)}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: 4, background: '#888', color: '#fff', border: 'none', cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
