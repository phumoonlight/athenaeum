import React, { Component } from 'react'
import myapi from '../api/movie'
import MovieCard from '../components/MovieCard'

export default class index extends Component {
  getMovies = async () => {
    console.log(await myapi.getMovies());
  }

  render() {
    return (
      <div>
        Movies
        <button type="button" onClick={this.postMovies}>post</button>
        <button
          type="button"
          onClick={this.getMovies}
        >
        get
        </button>
        <button type="button" onClick={this.getMoviesByID}>getMoviesByID</button>
        <button type="button" onClick={this.putMovies}>put</button>
        <button type="button" onClick={this.deleteMovies}>delete</button>
        <MovieCard />
      </div>
    );
  }
}
