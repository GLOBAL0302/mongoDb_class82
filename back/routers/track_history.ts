import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const track_historyRouter = express.Router();

track_historyRouter.post('/', auth, async (req, res, next) => {
  try {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const track = req.body.track;
    const track_history = new TrackHistory({
      user: user.id,
      track,
      datetime: new Date().toISOString(),
    });

    await track_history.save();
    res.status(200).send(track_history);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

export default track_historyRouter;