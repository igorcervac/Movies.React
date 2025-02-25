import React from 'react';
import Movie from '../Movie'

const AllMovies = (props: any) => {

    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {
                props.movies && props.movies.map((x: Movie) => 
                (
                    <div key={x.imdbID} className='image-container d-flex justify-content-start'>
                        <img src={x.poster} alt={x.title}></img>                        
                        <FavouriteComponent favouriteActionHandler={async () => await props.favouriteActionHandler(x)}/>
                    </div>
                ))
            }
        </>
    )
}

export default AllMovies;