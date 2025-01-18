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

track_historyRouter.get('/', auth, async (req, res, next) => {
  try {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
      res.status(301).redirect('/');
    }
    const tracksHistory = await TrackHistory.find({ user: user._id }).populate({
      path: 'track',
      populate: {
        path: 'album',
        model: 'Album',
        populate: {
          path: 'artist',
          model: 'Artist',
        },
      },
    });
    if (!tracksHistory) res.status(200).send({ message: 'No track with this user' });


    const sortedTracks = tracksHistory.sort((a, b)=>-a.dateTime.localeCompare(b.dateTime))
    res.status(200).send(sortedTracks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error });
      return;
    }
    next(error);
  }
});

export default track_historyRouter;
