import Movie from "../Movie";

export default interface IFavouriteMovieService {
    getAll(): Movie[];
    add(movie: Movie): Movie;
    remove(id: number): void;
}