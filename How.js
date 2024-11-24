import React, { useEffect } from 'react';

const Implementation = () => {
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '70px',
        backgroundSize: 'cover',
        backgroundImage: 'url(pexels-goumbik-574077.jpg)',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        margin: 0,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: 'auto',
          marginTop: '110px'
        }}
      >
        <h1 style={{ color: '#00008B' }}>How It Works</h1>
        <p
          style={{
            color: '#00008B',
            fontSize: '22px',
            backgroundColor: 'rgba(173, 216, 230, 0.5)', 
            padding: '20px', 
            borderRadius: '10px', 
            display: 'inline-block', 
            marginTop: '10px', 
          }}
        >
          The system utilizes a K-Nearest Neighbors (KNN)-based collaborative filtering model trained on the MovieLens dataset to provide movie recommendations. The model identifies similarities between movies based on user ratings and preferences, enabling personalized suggestions. A Flask API processes requests from the React front-end, where users can search for a movie, and recommendations are generated using the trained model. The recommended movies are displayed with clickable links to their IMDb pages for additional details. The system leverages the robust MovieLens dataset to ensure accurate and reliable suggestions. </p>
      </div>
    </div>
  );
};

export default Implementation;
