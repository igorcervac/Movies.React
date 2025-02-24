import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MoviesContext from './MoviesContext';
import IFavouriteMovieService from './services/IFavouriteMovieService';
import ApiFavouriteMovieService from './services/ApiFavouriteMovieService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const apiUrl = "https://localhost:7118/api/movies";
const apiUrl = "https://movies-api-100.azurewebsites.net/api/movies";
const favouriteMoviesService: IFavouriteMovieService = new ApiFavouriteMovieService(apiUrl);

root.render(
  <React.StrictMode>
    <MoviesContext.Provider value={favouriteMoviesService}>
      <App />
    </MoviesContext.Provider>
  </React.StrictMode>
);