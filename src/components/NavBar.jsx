import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function NavBar() {
  const [open, setOpen] = useState(false);

  // Random name for demo purposes
  const userNames = ['Rohit Sharma', 'Anita Kharshiing', 'Samuel Lotha', 'Neha Singh'];
  const userName = userNames[Math.floor(Math.random() * userNames.length)];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
      color: '#fff',
      zIndex: 1000,
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      borderBottomLeftRadius: '10px',
      borderBottomRightRadius: '10px'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px' }}>
        Safety Dashboard
      </div>

      {/* Hamburger for small screens */}
      <div className="hamburger" onClick={() => setOpen(!open)} style={{
        display: 'none',
        flexDirection: 'column',
        cursor: 'pointer',
        gap: '5px'
      }}>
        <span style={{ height: '3px', width: '25px', background: '#fff', borderRadius: '2px' }}></span>
        <span style={{ height: '3px', width: '25px', background: '#fff', borderRadius: '2px' }}></span>
        <span style={{ height: '3px', width: '25px', background: '#fff', borderRadius: '2px' }}></span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '500',
      }} className={open ? 'open' : ''}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/history" style={linkStyle}>History</Link>
        <span style={{ color: '#fff', marginLeft: '1rem' }}>Auth: <strong>{userName}</strong></span>
        <Link to="/logout" style={{ ...linkStyle, background: '#ef5350', padding: '0.25rem 0.75rem', borderRadius: '5px' }}>Logout</Link>
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .hamburger {
              display: flex;
            }
            nav div.open {
              display: flex;
              flex-direction: column;
              width: 100%;
              margin-top: 0.5rem;
              background: #1565c0;
              padding: 0.5rem 0;
              border-radius: 8px;
            }
            nav div.open a, nav div.open span {
              padding: 0.5rem 1rem;
            }
          }
        `}
      </style>
    </nav>
  );
}

// Shared link style
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  transition: '0.3s',
  padding: '0.25rem 0.5rem',
  borderRadius: '5px',
};
export default NavBar;
