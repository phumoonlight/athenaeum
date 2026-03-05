import mongoose from 'mongoose';

export default mongoose.model('person', mongoose.Schema({
  firstname: String,
  lastname: String,
}, { versionKey: false }));
