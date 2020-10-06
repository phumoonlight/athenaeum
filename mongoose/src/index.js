const mongoose = require('mongoose')
const { MONGO_CONNECTION } = require('../config')
mongoose.connect(MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });


const kittySchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy', age: Math.round(Math.random() *100) });

mongoose.connection.once('open', async () => {
  console.info('Mongoose connection has been connected.')
  const result = await fluffy.save()
  console.log(result)
});