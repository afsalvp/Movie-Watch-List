import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './Home.css';

const API_KEY = 'bae30232351e8f3aeb40a2b49dff96ce';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch trending movies on component mount
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false);
    }
  };

  const addToWatchlist = (movie) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some((m) => m.id === movie.id)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${movie.title} added to watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist!`);
    }
  };

  return (
    <div className="home">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {movies.length > 0 && (
        <div className="movie-section">
          <h2>Search Results</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onAddToWatchlist={addToWatchlist}
              />
            ))}
          </div>
        </div>
      )}

      <div className="movie-section">
        <h2>Trending Movies This Week</h2>
        <div className="movie-grid">
          {trendingMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onAddToWatchlist={addToWatchlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;