import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Movies from './components/Movies';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  const [search, setSearch] = useState<string>('Star Wars');

    useEffect(() => {
      const getMovies = async () => {
        const response = await fetch(`http://www.omdbapi.com?s=${search}&apikey=ebd94699`);
        const json = await response.json();
        setMovies(json.Search);
      }

      getMovies();
    }, [search]);

    const addToFavourites = (movie: Movie)=> {
        setFavouriteMovies([...favouriteMovies, movie]);
        // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
    }

    const removeFromFavourites = (movie: Movie) => {
      setFavouriteMovies(favouriteMovies.filter(x => x.imdbID !== movie.imdbID));
      // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
    }

  return (
  <div>
      <div className='container-fluid movies'>
        <h1>Movies</h1>
        <div className='row'>
          <Movies movies={movies} favouriteComponent={AddFavourite} favouriteActionHandler={addToFavourites}></Movies>
        </div>
      </div>
      <div className='container-fluid movies'>
        <h1>Favourites</h1>
        <div className='row'>
          <Movies movies={favouriteMovies} favouriteComponent={RemoveFavourite} favouriteActionHandler={removeFromFavourites}></Movies>
        </div>
      </div>

    </div>
  );
}

export default App;
