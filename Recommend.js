import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecommendForm = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (movieTitle.length > 0) {
        Axios.get('http://localhost:5000/movies')
          .then((response) => {
            const filteredMovies = response.data.filter((movie) =>
              movie.toLowerCase().includes(movieTitle.toLowerCase())
            );
            setMovieSuggestions(filteredMovies);
          })
          .catch((error) => {
            console.error('Error fetching movie titles:', error);
          });
      } else {
        setMovieSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [movieTitle]);

  const handleMovieChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleRecommendation = () => {
    if (!movieTitle || movieTitle.trim() === '') {
      navigate('/apology'); // Redirect to apology page if no movie is entered
      return;
    }

    // Check if the movie exists in the dataset
    if (!movieSuggestions.includes(movieTitle)) {
      navigate('/apology'); // Redirect if the movie is not in the dataset
      return;
    }

    setLoading(true);
    Axios.post('http://localhost:5000/recommend', { title: movieTitle })
      .then((response) => {
        setLoading(false);

        if (!response.data || response.data.length === 0) {
          navigate('/apology'); // Redirect if no recommendations are returned
        } else {
          navigate('/recommendations', { state: { recommendations: response.data, movieTitle } });
        }
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundImage: 'url(pexels-lribeirofotografia-2249227.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(173, 216, 230, 0.5)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
        }}
      >
        <h1
          style={{
            color: '#00008B',
          }}
        >
          Enter a movie to get similar recommendations!
        </h1>
      </div>

      <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          id="movieTitle"
          value={movieTitle}
          onChange={handleMovieChange}
          placeholder="Search for a movie..."
          style={{
            padding: '15px',
            width: '400px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#fff',
            margin: 0,
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleRecommendation}
          style={{
            marginLeft: '10px',
            padding: '15px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#00008B',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Recommending....' : 'Recommend'}
        </button>

        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            border: '1px solid #ccc',
            width: '400px',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            marginTop: '5px',
          }}
        >
          {movieSuggestions.map((movie, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
              }}
              onClick={() => {
                setMovieTitle(movie);
                setMovieSuggestions([]);
              }}
            >
              {movie}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendForm;

