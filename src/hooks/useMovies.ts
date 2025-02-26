import { useEffect, useState } from "react";
import Movie from "../Movie";
import SearchMovie from "../SearhMovie";

function useMovies(search: string) {
    const [movies, setMovies] = useState<Movie[]>();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://www.omdbapi.com?s=${search}&apikey=ebd94699`);
            const json = await response.json() ?? [];
            const searchMovies = json.Search ?? [];            

            setMovies(searchMovies.map(
                (x: SearchMovie) => 
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
        }
        getData();
    }, [search]);

    return {movies};
}

export default useMovies;