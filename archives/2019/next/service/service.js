const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');

const app = Express();

app.use(cors());

Mongoose.connect('mongodb://localhost/mydb');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const Movies = Mongoose.model('movies', {
  name: String,
  detail: String,
  price: Number,
  picture: String,
});

app.post('/movies', async (request, response) => {
  const result = await new Movies(request.body).save();
  response.send(result);
});

app.get('/movies', async (request, response) => {
  const result = await Movies.find().exec();
  response.send(result);
});

app.get('/movies/:id', async (request, response) => {
  const person = await Movies.findById(request.params.id).exec();
  response.send(person);
  console.log(person);
});

app.put('/movies/:id', async (request, response) => {
  const person = await Movies.findById(request.params.id).exec();
  person.set(request.body);
  const result = await person.save();
  response.send(result);
});

app.delete('/movies/:id', async (request, response) => {
  const result = await Movies.deleteOne({ name: request.params.id }).exec();
  response.send(result);
});

app.listen(8080, () => {
  console.log('Listening at :8080');
});
