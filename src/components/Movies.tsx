import React, { useContext, useEffect, useState } from "react";
import AllMovies from "./AllMovies";
import FavouriteMovies from "./FavouriteMovies";
import SearchBox from "./SearchBox";
import Movie from "../Movie";
import AddFavourite from "./AddFavourite";
import RemoveFavourite from "./RemoveFavourite";
import MoviesContext from "../MoviesContext";
import useMovies from "../hooks/useMovies";

const Movies = () => {
    const [search, setSearch] = useState<string>('Star Wars');
      const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
      }

    const { movies } = useMovies(search);    
  
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
    const favouriteMoviesService = useContext(MoviesContext)!;  

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