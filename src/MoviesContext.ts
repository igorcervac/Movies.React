import { createContext } from "react";
import IFavouriteMovieService from "./services/IFavouriteMovieService";

const MoviesContext = createContext<IFavouriteMovieService | null>(null);

export default MoviesContext;