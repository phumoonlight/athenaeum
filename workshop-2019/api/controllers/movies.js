import Movie from '../models/movie';

const getMovies = async (request, response) => {
  const { query } = request;
  let result;
  try {
    if (Object.prototype.hasOwnProperty.call(query, 'searchkey')) {
      const { searchkey } = query;
      result = await Movie.find({ name: { $regex: searchkey, $options: 'i' } }).exec();
    } else {
      result = await Movie.find().exec();
    }
    response.status(200).send(result);
  } catch (error) {
    response.status(404).send(error);
  }
};

const getMovieById = async (request, response) => {
  try {
    const result = await Movie.findById(request.params.id);
    response.status(200).send(result);
  } catch (error) {
    response.status(404).send(error);
  }
};

const addMovie = async (request, response) => {
  try {
    const movie = new Movie(request.body);
    const result = await movie.save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
};

const updateMovie = async (request, response) => {
  try {
    const movie = await Movie.findById(request.params.id).exec();
    movie.set(request.body);
    const result = await movie.save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
};

const deleteMovie = async (request, response) => {
  try {
    const result = await Movie.deleteOne({ _id: request.params.id }).exec();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
};

export default {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
