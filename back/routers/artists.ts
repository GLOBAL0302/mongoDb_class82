import express from 'express';
import {imagesUpload} from '../multer';
import Artist from '../models/Artist';


const artistsRouter = express.Router();



artistsRouter.get('/', async (req, res, next) => {
    try {
      const artists = await Artist.find();
      res.status(200).send(artists);
    }catch (error) {
        next(error);
    }
});

artistsRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    try {
      const newArtist = {
        title:req.body.title,
        image:req.file ? "images" + req.file.filename : null,
        description: req.body.description,
      }
      const artists= new Artist(newArtist);
      await artists.save();
      res.status(200).send(artists);
    }catch (error) {
        next(error);
    }
});

export default artistsRouter;