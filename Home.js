import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px',
        backgroundImage: 'url(/pexels-cottonbro-10599804.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100%',
        margin: '0',
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0, 0, 139, 0.5)',  
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '20px',
      }}>
        <h1 style={{ color: '#fff', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' }}>
          Endless movie options, just one click away!
        </h1>
        <h3 style={{ color: '#fff', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' }}>
          Go to Recommend, and find out your next favourite movie to choose from in seconds!
        </h3>
      </div>
    </div>
  );
};

export default Home;
