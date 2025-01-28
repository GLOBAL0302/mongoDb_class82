import mongoose, { CallbackError } from 'mongoose';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter title'],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'artistId is required'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  create_at: {
    type: Number,
    required: true,
  },
  image: String,
});

AlbumSchema.pre('deleteMany', async function (next) {
  const albumId = this.getQuery()._id;

  try {
    await mongoose.model('Track').deleteMany({ album: albumId });
  } catch (error) {
    next(error as CallbackError);
  }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
