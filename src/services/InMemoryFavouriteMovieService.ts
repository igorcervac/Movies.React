import Movie from "../Movie";
import IFavouriteMovieService from './IFavouriteMovieService'

export default class InMemoryFavouriteMovieService implements IFavouriteMovieService {
    movies: Movie[] = [];

    async getAll(): Promise<Movie[]> {
        return Promise.resolve(this.movies);
    }

    async add(movie: Movie): Promise<Movie> {
        const maxId = this.movies.map(x => x.id).reduce((a, c) => c > a ? c: a, 0);
        movie.id = maxId + 1;
        this.movies = [...this.movies, movie];

        return Promise.resolve(movie);
    }

    async remove(id: number):Promise<void> {
        this.movies = this.movies.filter(x => x.id !== id);

        return Promise.resolve();
    }
}