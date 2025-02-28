import { useContext, useEffect, useState } from "react";
import Movie from "../Movie";
import MoviesContext from "../MoviesContext";

export default function useFavourites(){
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const favouriteMoviesService = useContext(MoviesContext)!; 
    
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

    useEffect(() => {

        setLoading(true);

        const getFavouriteMovies = async () => {
          const json = await favouriteMoviesService.getAll();
          setFavouriteMovies(json);
          setLoading(false);
        };
  
        getFavouriteMovies();
        
      }, [favouriteMoviesService]);

      return { favouriteMovies, loading, addToFavourites, removeFromFavourites };      
}