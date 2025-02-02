import React from 'react';
import Movie from './Movie'
import IProps from './IProps';

const Movies = ({movies}: IProps) => {
    return (
        <>
            {
                movies.map((x: Movie) => 
                (
                    <div key={x.imdbID} className='d-flex justify-content-start m-3'>
                        <img src={x.Poster} alt={x.Title}></img>
                    </div>
                ))
            }
        </>
    )
}

export default Movies;