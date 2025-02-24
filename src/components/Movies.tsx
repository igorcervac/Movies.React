import React, { useContext, useEffect, useState } from "react";
import AllMovies from "./AllMovies";
import FavouriteMovies from "./FavouriteMovies";
import SearchBox from "./SearchBox";
import Movie from "../Movie";
import AddFavourite from "./AddFavourite";
import RemoveFavourite from "./RemoveFavourite";
import MoviesContext from "../MoviesContext";

const Movies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
  
    const [search, setSearch] = useState<string>('Star Wars');

    const favouriteMoviesService = useContext(MoviesContext)!;
  
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
          const json = await favouriteMoviesService.getAll();
          setFavouriteMovies(json);
        };
  
        getFavouriteMovies();
        
      });
  
      const addToFavourites = async (movie: Movie)=> {
          setFavouriteMovies([...favouriteMovies, movie]);
          // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
          await favouriteMoviesService.add(movie);
      }
  
      const removeFromFavourites = async (movie: Movie) => {
        setFavouriteMovies(favouriteMovies.filter(x => x.id !== movie.id));
        // setMovies(movies.filter(x => !favouriteMovies.includes(x)));
        await favouriteMoviesService.remove(movie.id);
      }
  
      const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
          setSearch(e.target.value);
      }

    return (<>
        <div className='movies-header'>
                <h2>All movies</h2>
                <SearchBox searchHandler={searchHandler} searchValue={search}></SearchBox>
            </div>
            <div className='container-fluid movies'>         
            <div className='row'>
                <AllMovies movies={movies} favouriteComponent={AddFavourite} favouriteActionHandler={addToFavourites}></AllMovies>
            </div>
            </div>

            <h2>Favourite  movies</h2>
            <div className='container-fluid movies'>
            <div className='row'>
                <FavouriteMovies movies={favouriteMovies} favouriteComponent={RemoveFavourite} favouriteActionHandler={removeFromFavourites}></FavouriteMovies>
            </div>
            </div>
        </>);
}

export default Movies;