import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import TrackHistory from '../models/TrackHistory';

const track_historyRouter = express.Router();

track_historyRouter.post('/', async (req, res, next) => {
  try {
    const track = req.body.track;
    const token = req.get('Authorization');

    if (!token) {
      res.status(401).send('Token is not provided');
    }
    const user = await User.findOne({ token });

    if (!user) {
      res.status(401).send('Token is incorrect');
      return;
    }

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
