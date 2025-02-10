import Movie from "../Movie";
import IFavouriteMovieService from './IFavouriteMovieService'

class ApiFavouriteMovieService implements IFavouriteMovieService {
    // apiUrl = "https://localhost:7118/api/movies";
    apiUrl = "https://movies-api-100.azurewebsites.net/api/movies";

    async getAll() : Promise<Movie[]> {
        const response = await fetch(this.apiUrl);
        return await response.json();
    }

    async add(movie: Movie): Promise<Movie> {
       const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(movie)
       });

       return await response.json()
    }

    async remove(id: number):Promise<void> {
        await fetch(`${this.apiUrl}/${id}`, {
            method:"DELETE"
        });
    }
}

const favouriteMovieService: IFavouriteMovieService = new ApiFavouriteMovieService();
export default favouriteMovieService;