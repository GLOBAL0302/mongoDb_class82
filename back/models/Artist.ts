import mongoose, { CallbackError } from 'mongoose';

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  image: String,
  description: String,
});

artistSchema.pre('findOneAndDelete', async function (next) {
  const postId = this.getQuery()._id;
  try {
    await mongoose.model('Album').deleteMany({ artist: postId });
  } catch (error) {
    next(error as CallbackError);
  }
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
