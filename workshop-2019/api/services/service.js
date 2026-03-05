import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import movies from '../controllers/movies';


mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/movies', movies.getMovies);
app.get('/movies/:id', movies.getMovieById);
app.post('/movies', movies.addMovie);
app.put('/movies/:id', movies.updateMovie);
app.delete('/movies/:id', movies.deleteMovie);

app.listen(8080, () => {
  console.log('Listening at :8080');
});
