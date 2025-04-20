import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

const API_KEY = 'bae30232351e8f3aeb40a2b49dff96ce';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some((m) => m.id === movie.id)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${movie.title} added to watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist!`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-details">
      <div className="movie-backdrop">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
      </div>
      <div className="movie-content">
        <div className="movie-poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="no-poster">No poster available</div>
          )}
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="release-date">{movie.release_date}</p>
          <p className="runtime">{movie.runtime} minutes</p>
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="overview">{movie.overview}</p>
          <p className="rating">Rating: {movie.vote_average}/10</p>
          <button onClick={addToWatchlist} className="add-to-watchlist">
            Add to Watchlist
          </button>
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;