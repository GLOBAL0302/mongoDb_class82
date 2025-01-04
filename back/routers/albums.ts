import express from "express";
import {imagesUpload} from '../multer';
import Album from '../models/Album';


const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  const artistId = req.query.artist


  try {
    let albums
    if(artistId){
      albums =  await Album.find({artist:artistId});
    }else{
      albums =  await Album.find();
    }

    res.status(200).send(albums);
  }  catch (error) {
      console.log(error);
  }
})

albumsRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;

    if(!id)res.status(404).send({error:"Id required"});

    const album = await Album.findById(id);
    if(!album)res.status(404).send({error:"Album not found"});
    res.status(200).send(album);
    try {

    }  catch (error) {
        console.log(error);
    }
});


albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const newAlbum = {
    title:req.body.title,
    artist:req.body.artist,
    create_at: req.body.create_at? req.body.create_at : new Date().toISOString(),
    image:req.file? "images" + req.file.filename : null,
  };

  try{
    const albums = new Album(newAlbum);
    await albums.save();
    res.send(albums);

    }catch(error) {
        console.error(error);
    }
});

export default albumsRouter;