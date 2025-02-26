import React, { useState } from "react";
import AllMovies from "./AllMovies";
import FavouriteMovies from "./FavouriteMovies";
import SearchBox from "./SearchBox";
import AddFavourite from "./AddFavourite";
import RemoveFavourite from "./RemoveFavourite";
import useMovies from "../hooks/useMovies";
import useFavourites from "../hooks/useFavourites";

const Movies = () => {
    const [search, setSearch] = useState<string>('Star Wars');
      const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
      }

    const { movies } = useMovies(search); 
    const {favouriteMovies, addToFavourites, removeFromFavourites} = useFavourites();    
  
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