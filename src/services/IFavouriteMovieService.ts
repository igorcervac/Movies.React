import Movie from "../Movie";

export default interface IFavouriteMovieService {
    getAll(): Promise<Movie[]>;
    add(movie: Movie): Promise<Movie>;
    remove(id: number): Promise<void>;
}