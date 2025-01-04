import express from 'express';


const artistsRouter = express.Router();



artistsRouter.get('/', (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
});

artistsRouter.post('/', (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
});

export default artistsRouter;