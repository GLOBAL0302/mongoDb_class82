import express from "express";


const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  try {

  }  catch (error) {
      console.log(error);
  }
})

albumsRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;

    if(!id)res.status(404).send({error:"Id required"});

    try {

    }  catch (error) {
        console.log(error);
    }
});


albumsRouter.post("/", async (req, res, next) => {
    try{

    }catch(error) {
        console.error(error);
    }
});

export default albumsRouter;