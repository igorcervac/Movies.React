import React, {  } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Movies from './components/Movies';

function App() { 
  return (
    <BrowserRouter>
      <header>
        <h1>Movies</h1>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
          </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' Component={Movies}></Route>
          <Route path='/about' Component={About}></Route>
        </Routes>
      </main>
    </BrowserRouter>       
  );
}

export default App;
