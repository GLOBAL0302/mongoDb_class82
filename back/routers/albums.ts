import express from 'express';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import auth from '../middleware/auth';
import { Error } from 'mongoose';
import permit from '../middleware/permit';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  const artistId = req.query.artist;
  try {
    let albums;
    if (artistId) {
      albums = await Album.find({ artist: artistId }).populate('artist').sort({ create_at: -1 });
    } else {
      albums = await Album.find().populate('artists');
    }

    res.status(200).send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  if (!id) res.status(404).send({ error: 'Id required' });

  const album = await Album.findById(id);
  if (!album) res.status(404).send({ error: 'Album not found' });
  res.status(200).send(album);
  try {
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
  const newAlbum = {
    title: req.body.title,
    artist: req.body.artist,
    create_at: req.body.create_at ? req.body.create_at : new Date().toISOString(),
    image: req.file ? 'images' + req.file.filename : null,
  };

  try {
    const albums = new Album(newAlbum);
    await albums.save();
    res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const album = await Album.findOne({ _id: id });
    if (!album) {
      res.status(404).send({ error: 'Album not found' });
      return;
    }

    const updatedAlbum = await Album.findOneAndUpdate({ _id: id }, { $set: { ...album, isPublished: !album } });
    if (!updatedAlbum) {
      res.status(404).send({ error: 'Album not updated' });
      return;
    }
    updatedAlbum.save();
    res.status(200).send(updatedAlbum);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
    next();
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    await Album.deleteOne({ _id: id });
    res.status(200).send({ message: 'Album successfully deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
    next();
  }
});
export default albumsRouter;
