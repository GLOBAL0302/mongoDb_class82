import express from 'express';
import Track from '../models/Track';
import album from '../models/Album';
import artist from '../models/Artist';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  const albumId = req.query.albumId;
  console.log(albumId);

  try {
    let tracks;
    if (albumId) {
      tracks = await Track.find({ album: albumId });
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
    let test = [];
    let tracks = await Track.find().populate('album');

    const albums = await Album.find({ artist: id }).populate('artist');
    const albumId = albums.map((item) => item._id);

    res.status(200).send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
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

export default tracksRouter;
