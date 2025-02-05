import React from 'react';
import Movie from '../Movie'
import IProps from '../IProps';

const Movies = (props: any) => {

    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {
                props.movies.map((x: Movie) => 
                (
                    <div key={x.imdbID} className='image-container d-flex justify-content-start m-3'>
                        <img src={x.Poster} alt={x.Title}></img>                        
                        <FavouriteComponent actionHandler={() => props.favouriteActionHandler(x)}/>
                    </div>
                ))
            }
        </>
    )
}

export default Movies;