import Movie from "../Movie";
import IFavouriteMovieService from './IFavouriteMovieService'

export default class ApiFavouriteMovieService implements IFavouriteMovieService {   
   apiUrl:string = "";

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;        
    }

    async getAll() : Promise<Movie[]> {
        const response = await fetch(this.apiUrl, {
            headers: {
            "Access-Control-Allow-Origin": "*"
            }
        });
        return await response.json();
    }

    async add(movie: Movie): Promise<Movie> {
       const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"},
        body: JSON.stringify(movie)
       });

       return await response.json()
    }

    async remove(id: number):Promise<void> {
        await fetch(`${this.apiUrl}/${id}`, {
            method:"DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}