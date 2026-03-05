import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  detail: String,
  price: Number,
  image: String,
  date: Date,

}, { versionKey: false });

const Movie = mongoose.model('movies', schema);

export default Movie;
