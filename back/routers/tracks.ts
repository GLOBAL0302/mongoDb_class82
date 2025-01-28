import express from 'express';
import Track from '../models/Track';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { Error } from 'mongoose';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  const albumId = req.query.albumId;
  try {
    let tracks;
    if (albumId) {
      tracks = await Track.find({ album: albumId })
        .populate({
          path: 'album',
          populate: {
            path: 'artist',
            model: 'Artist',
          },
        })
        .sort('track_number');
    } else {
      tracks = await Track.find();
    }

    res.status(200).send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    res.status(404).send({ error: 'Id required' });
  }
  try {
    let tracks = await Track.find().populate('album');
    res.status(200).send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  const newTrack = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
  };

  try {
    const track = new Track(newTrack);
    await track.save();
    res.send(track);
    res.status(200).send(track);
  } catch (error) {
    next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const track = await Track.findOne({ _id: id });
    if (!track) {
      res.status(400).send({ error: 'Track not found' });
      return;
    }

    const updatedTrack = await Track.updateOne({ _id: id }, { $set: { ...track, isPublished: !track.isPublished } });
    if (!updatedTrack) {
      res.status(400).send({ error: 'Track has not been updated' });
      return;
    }
    res.status(200).send(updatedTrack);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
    next();
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;

    await Track.deleteOne({ _id: id });
    res.status(200).send({ message: ' Track Successfully deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
  }
});

export default tracksRouter;
