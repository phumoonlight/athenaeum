/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import person from './controllers/people';

mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/people', person.get);
app.get('/people/:id', person.getByUserID);
app.post('/people', person.post);
app.put('/people/:id', person.put);
app.delete('/people/:id', person.deleteByID);

app.listen(3000, () => {
  console.log('Listening at :3000');
});
