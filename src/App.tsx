import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Movies from './components/Movies';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';
import SearchBox from './components/SearchBox';
import favouriteMovieService from './services/ApiFavouriteMovieService';
import FavouriteMovies from './components/FavouriteMovies';

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
      const getFavouriteMovies = async () => {
        const json = await favouriteMovieService.getAll();
        setFavouriteMovies(json);
      };

      getFavouriteMovies();
      
    },[]);

    const addToFavourites = async (movie: Movie)=> {
        setFavouriteMovies([...favouriteMovies, movie]);
        // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
        await favouriteMovieService.add(movie);
    }

    const removeFromFavourites = async (movie: Movie) => {
      setFavouriteMovies(favouriteMovies.filter(x => x.id !== movie.id));
      // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
      await favouriteMovieService.remove(movie.id);
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
        setSearch(e.target.value);
    }

  return (
  <div>
      <div className='container-fluid movies'>
        <div className='movies-header'>
          <h2>Movies</h2>
          <SearchBox searchHandler={searchHandler} searchValue={search}></SearchBox>
        </div>
        <div className='row'>
          <Movies movies={movies} favouriteComponent={AddFavourite} favouriteActionHandler={addToFavourites}></Movies>
        </div>
      </div>

      <div className='container-fluid movies'>
        <h2>Favourites</h2>
        <div className='row'>
          <FavouriteMovies movies={favouriteMovies} favouriteComponent={RemoveFavourite} favouriteActionHandler={removeFromFavourites}></FavouriteMovies>
        </div>
      </div>

    </div>
  );
}

export default App;
