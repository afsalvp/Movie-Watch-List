import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} />
      </Link>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <div className="movie-actions">
          <button onClick={() => onAddToWatchlist(movie)}>Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;