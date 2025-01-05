import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  image: String,
  description: String,
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
