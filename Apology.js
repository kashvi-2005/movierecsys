import React from 'react';
import { Link } from 'react-router-dom';

const Apology = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'white', // White background
        flexDirection: 'column',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      {/* Image in the center */}
      <img
        src="apology.jpg" // Replace with your image URL
        alt="Apology"
        style={{ width: '400px', height: '350px', marginTop: '100px' }}
      />
      
      {/* Apology Message */}
      <h1 style={{ color: '#00008B' }}>Oops! Something went wrong.</h1>
      <p>We were unable to fetch movie titles at the moment. Please try again later.</p>
      
      {/* Link back to home */}
      <Link to="/" style={{ color: '#00008B', textDecoration: 'underline', fontSize: '1.2rem' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default Apology;
