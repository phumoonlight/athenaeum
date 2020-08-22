const mongoose = require('mongoose')
const { MONGO_CONNECTION } = require('../config')
mongoose.connect(MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


const kittySchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy', age: 66 });

db.once('open', async function() {
  console.log('conntect')
  const result = await fluffy.save()
  console.log(result)
});