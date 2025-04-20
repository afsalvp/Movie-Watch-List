import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="watchlist">
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty.</p>
          <Link to="/" className="browse-link">Browse movies to add to your watchlist</Link>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-movie">
              <MovieCard movie={movie} />
              <button 
                onClick={() => removeFromWatchlist(movie.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;