import React from 'react';

// Dummy expired trips
const expiredTrips = [
  { id: '0xD4E5F6', trip: 'Delhi → Wokha Town', expiredOn: '2025-09-20', sos: 'Yes', efir: '/efir_0xD4E5F6.pdf', location: 'Wokha District' },
  { id: '0xM7N8O9', trip: 'Delhi → Merangkong', expiredOn: '2025-09-23', sos: 'Yes', efir: '/efir_0xM7N8O9.pdf', location: 'Wokha District' },
  { id: '0xP1Q2R3', trip: 'Guwahati → Sungro', expiredOn: '2025-09-25', sos: 'No', efir: null, location: 'Wokha District' },
];


function History() {
  const totalUsers = expiredTrips.length;
  const totalEFIR = expiredTrips.filter(u => u.efir).length;
  const totalSOS = expiredTrips.filter(u => u.sos === 'Yes').length;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Expired Trips History</h2>

      {/* Summary panel */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          background: '#f0f2f5', padding: '0.75rem 1rem', borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, textAlign: 'center'
        }}>
          <strong>Total Users</strong>
          <div style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{totalUsers}</div>
        </div>

        <div style={{
          background: '#f0f2f5', padding: '0.75rem 1rem', borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, textAlign: 'center'
        }}>
          <strong>Total eFIR Registered</strong>
          <div style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{totalEFIR}</div>
        </div>

        <div style={{
          background: '#f0f2f5', padding: '0.75rem 1rem', borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, textAlign: 'center'
        }}>
          <strong>Total SOS Pressed</strong>
          <div style={{ fontSize: '1.5rem', marginTop: '0.25rem', color: '#d32f2f' }}>{totalSOS}</div>
        </div>
      </div>

      {/* History Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ background: '#f0f2f5' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Decentralised ID</th>
            <th>Trip</th>
            <th>Expired On</th>
            <th>SOS Pressed</th>
            <th>eFIR PDF</th>
          </tr>
        </thead>
        <tbody>
          {expiredTrips.map(u => (
            <tr key={u.id}>
              <td style={{ padding: '0.75rem' }}>{u.id}</td>
              <td>{u.trip}</td>
              <td>{u.expiredOn}</td>
              <td style={{ color: u.sos === 'Yes' ? '#d32f2f' : '#222', fontWeight: u.sos === 'Yes' ? 'bold' : 'normal' }}>{u.sos}</td>
              <td>{u.efir ? <a href={u.efir} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>View PDF</a> : <span style={{ color: '#888' }}>No eFIR</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
