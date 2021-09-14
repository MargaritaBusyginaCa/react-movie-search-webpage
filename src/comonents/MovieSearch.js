import React, { useState } from "react";
import "../index.css";
import MovieCard from "./MovieCard";

export default function MovieSearch() {

  //states- input query, movies
  const [query, setQuery] = useState("");
  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  function success() {
    if(document.getElementById("query-input").value==="") { 
             document.getElementById("button").disabled = true; 
         } else { 
             document.getElementById("button").disabled = false;
         }
     }

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=7615ff55f8552630b13bb1ea7254eb17&language=en-US&query=${query}&page=1`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          setMovies(data.results);
        } catch (err) {
          console.error(err);
        }

    
  };

  return (
    <div className="main-container">
      <h2 className="title">React Moview Search</h2>

      <form className="form" onSubmit={searchMovies}>
        <label className="form--label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="form--movie-name-input"
          type="text"
          autoComplete="off"
          name="query"
          id="query-input"
          onKeyUp={success}
          placeholder="i.e:The Great Gatsby"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className="button" type="submit" id="button" disabled>
          Search
        </button>
      </form>
      <div className="card-list" id="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id}/>
          ))}
      </div>
    </div>
  );
}
