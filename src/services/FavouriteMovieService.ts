import Movie from "../Movie";
import IFavouriteMovieService from './IFavouriteMovieService'

class FavouriteMovieService implements IFavouriteMovieService {
    movies: Movie[] = [
        { 
            id:0, 
            title:"Starwars: Goretech", 
            year:"2018", 
            imdbID:"tt9336300", 
            type:"movie", 
            poster:"https://m.media-amazon.com/images/M/MV5BOGUyMjY5YjMtZTYzNS00ZjIyLTk5MDMtZmMzNGI0MWZmZDVkXkEyXkFqcGc@._V1_SX300.jpg"
        }
    ];

    getAll(): Movie[] {
        return this.movies;
    }

    add(movie: Movie): Movie {
        const maxId = this.movies.map(x => x.id).reduce((a, c) => c > a ? c: a, 0);
        movie.id = maxId + 1;
        this.movies = [...this.movies, movie];
        return movie;
    }

    remove(id: number):void {
        this.movies = this.movies.filter(x => x.id !== id)
    }
}

const favouriteMovieService: IFavouriteMovieService = new FavouriteMovieService();
export default favouriteMovieService;