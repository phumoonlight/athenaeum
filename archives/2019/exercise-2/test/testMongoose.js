/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

const Person = mongoose.model('testperson', mongoose.Schema({
  name: String,
  age: Number,
  isAlive: Boolean,
}, { versionKey: false }));

const testPerson = new Person({
  name: 'noobmaster69',
  age: 10,
  isAlive: true,
});

testPerson.save((err) => { if (err) throw err; });
