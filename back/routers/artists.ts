import express from 'express';
import { imagesUpload } from '../multer';
import Artist from '../models/Artist';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { Error } from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const newArtist = {
      title: req.body.title,
      image: req.file ? 'images' + req.file.filename : null,
      description: req.body.description,
    };
    const artists = new Artist(newArtist);
    await artists.save();
    res.status(200).send(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findOne({ _id: id });
    if (!artist) {
      res.status(404).send({ error: 'Artist not found' });
      return;
    }

    const updatedArtist = await Artist.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...artist,
          isPublished: !artist.isPublished,
        },
      },
    );

    if (!updatedArtist) {
      res.status(404).send({ error: 'Artist not been updated' });
      return;
    }
    await updatedArtist.save();
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
    next();
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    await Artist.deleteOne({ _id: id });
    res.status(200).send({ message: 'Artist Successfully deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error.message);
    }
    next();
  }
});

export default artistsRouter;
