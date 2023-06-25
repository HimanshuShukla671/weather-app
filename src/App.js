import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'f353c1f093c8113f8d4816aedd185969';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(API_URL + query);
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('City not found');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-container">
          <div className="current-weather">
            <h2>{weather.name}</h2>
            <p className="temperature">{weather.main.temp}°C</p>
            <p className="description">{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
