import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Movies from './Movies';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('Star Wars');

    useEffect(() => {
      const getMovies = async () => {
        const response = await fetch(`http://www.omdbapi.com?s=${search}&apikey=ebd94699`);
        const json = await response.json();
        setMovies(json.Search);
      }

      getMovies();
    }, [search]);

  return (
  <div>
      {/* <h1>Movies</h1> */}

      <div className='container-fluid movies'>
        <div className='row'>
          <Movies movies={movies}></Movies>
        </div>
      </div>

    </div>
  );
}

export default App;
