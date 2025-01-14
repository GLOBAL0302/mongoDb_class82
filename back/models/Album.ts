import mongoose from 'mongoose';

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
  create_at: {
    type: Number,
    required: true,
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
