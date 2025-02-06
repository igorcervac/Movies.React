import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Movies from './components/Movies';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';
import SearchBox from './components/SearchBox';
import favouriteMovieService from './services/FavouriteMovieService';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  const [search, setSearch] = useState<string>('Star Wars');

    useEffect(() => {
      const getMovies = async () => {
        const response = await fetch(`https://www.omdbapi.com?s=${search}&apikey=ebd94699`);
        const json = await response.json();
        const searchedMovies = json.Search ?? [];
        setMovies(searchedMovies.map(
          (x: any) => 
          (
            {
              imdbID: x.imdbID, 
              title: x.Title, 
              poster: x.Poster, 
              year: x.Year, 
              type: x.Type
            }
          ) as Movie
        ));
      };

      getMovies();
    }, [search]);

    useEffect(() => {
      setFavouriteMovies(favouriteMovieService.getAll());
    },[]);

    const addToFavourites = (movie: Movie)=> {
        setFavouriteMovies([...favouriteMovies, movie]);
        // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
        favouriteMovieService.add(movie);
    }

    const removeFromFavourites = (movie: Movie) => {
      setFavouriteMovies(favouriteMovies.filter(x => x.imdbID !== movie.imdbID));
      // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
      favouriteMovieService.remove(movie.id);

    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
        setSearch(e.target.value);
    }

  return (
  <div>
      <div className='container-fluid movies'>
        <div className='movies-header'>
          <h1>Movies</h1>
          <SearchBox searchHandler={searchHandler} searchValue={search}></SearchBox>
        </div>
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
