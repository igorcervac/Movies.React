import React, { useEffect, useState } from 'react';
import './App.css';

type Movie = {
  imdbID: string,
  Type: string,
  Title: string,
  Year: string,
  Poster: string
}

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
      <h1>Movies</h1>

      <div className='movies'>
        {
          movies.map(x => (
          <div key={x.imdbID} className='movie'>
            <h3>{x.Title}</h3>
            <img src={x.Poster} alt={x.Title}/>
          </div>))
        }
      </div>

    </div>
  );
}

export default App;
