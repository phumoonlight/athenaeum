import mongoose from 'mongoose';

let random = 0;
const personSchema = mongoose.Schema({
  userid: {
    type: String,
    default() {
      random += 1;
      return random;
    },
  },
  firstname: String,
  lastname: String,

}, { versionKey: false });

const Person = mongoose.model('person', personSchema);

export default Person;
