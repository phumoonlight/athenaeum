import Axios from 'axios';

const getMovies = async () => {
  const data = await Axios.get('http://localhost:8080/movies')
  return data
}

const getMoviesByID = async () => {
  const data = await Axios.get('http://localhost:8080/movies/:id')
  return data
}

const addMovies = async () => {
  const data = await Axios.post('http://localhost:8080/movies')
  return data
}

const editMovies = async () => {
  const data = await Axios.put('http://localhost:8080/movies/:id')
  return data
}

const deleteMovies = async () => {
  const data = await Axios.delete('http://localhost:8080/movies/:id')
  return data
}

export default {
  getMovies,
  getMoviesByID,
  addMovies,
  editMovies,
  deleteMovies,
}
