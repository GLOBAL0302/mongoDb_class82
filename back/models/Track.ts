import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  track_number: {
    type: Number,
    required: [true, 'Track number is required'],
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Album is required'],
  },
  duration: {
    type: String,
    default: '',
  },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
