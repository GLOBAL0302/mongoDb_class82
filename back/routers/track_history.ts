import express from 'express';
import { Error } from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const track_historyRouter = express.Router();

track_historyRouter.post('/', auth, async (req, res, next) => {
  try {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const track = req.body;
    const track_history = new TrackHistory({
      user: user._id,
      track,
      datetime: new Date().toISOString(),
    });


    await track_history.save();
    res.status(200).send(track_history);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

export default track_historyRouter;