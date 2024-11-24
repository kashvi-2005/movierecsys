import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// employed ai help on how to hover and redirect

const RecommendationsPage = () => {
  const { state } = useLocation();
  const { user_movie_details, movies } = state?.recommendations || {}; 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_movie_details || !movies || movies.length === 0) {
      navigate('/apology');  
    }
  }, [user_movie_details, movies, navigate]);

  if (!movies || movies.length === 0) {
    return null;  
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundImage: 'url("pexels-cottonbro-4722571.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundAttachment: 'fixed', 
          zIndex: '-1', 
        }}
      ></div>
      
      <div style={{ marginBottom: '100px', display: 'flex', alignItems: 'center', paddingLeft: '100px' }}>
        <img
          src={user_movie_details?.poster_url}
          alt={user_movie_details?.title}
          style={{ width: '330px', height: '480px', marginRight: '30px', marginTop: '180px' }}
        />
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginLeft: '18px', marginTop: '210px', color: 'white' }}>
            {user_movie_details?.title}
          </h1>
          
          <div style={{ marginTop: '20px', maxWidth: '900px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '20px', color: 'white' }}>Synopsis:</p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'justify', marginLeft: '20px', color: 'white' }}>
              {user_movie_details?.synopsis}
            </p>

            <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '30px', marginLeft: '20px', color: 'white' }}>
              Release Date:
            </p>
            <p style={{ marginLeft: '20px', color: 'white' }}>{user_movie_details?.release_date}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '20px', color: 'white' }}>
                  Rating:
                </p>
                <p style={{ marginLeft: '20px', color: 'white' }}>{user_movie_details?.rating}</p>
              </div>

              <a
                href={user_movie_details?.imdb_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#00008B',
                  color: 'white', 
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '1.4rem',
                  transition: 'transform 0.3s ease', 
                  marginLeft: '20px', 
                }}
                className="imdb-button"
              >
                View more on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>


      <h1 style={{ marginLeft: '60px', marginTop: '0px', fontWeight: 'bold', color: 'white' }}>
        Other movies you may like:
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginTop: '50px' }}>
        {movies.map((movie, index) => (
          <div key={index} style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
            <a href={movie.imdb_link} target="_blank" rel="noopener noreferrer">
              <img
                src={movie.poster_url}
                alt={movie.title}
                style={{
                  width: '200px',
                  height: '290px',
                  marginBottom: '20px',
                  transition: 'transform 0.3s ease',
                }}
                className="movie-poster"
              />
            </a>
            <p style={{ fontWeight: 'bold', color: 'white' }}>{movie.title}</p>
          </div>
        ))}
      </
      <style>
        {`
          .movie-poster:hover {
            transform: scale(1.1); /* Make the movie poster bigger on hover */
          }
          
          .imdb-button:hover {
            transform: scale(1.1); /* Make the IMDb button bigger on hover */
          }
        `}
      </style>
    </div>
  );
};

export default RecommendationsPage;
