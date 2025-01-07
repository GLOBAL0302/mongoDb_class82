import express from 'express';
import { Error } from 'mongoose';
import User from '../models/User';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
      return;
    }
    next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).send({ error: 'User not found' });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: 'Password not match' });
      return;
    }

    user.generateToken();
    await user.save();
    res.send({ message: 'username and password are correct', user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

export default userRouter;
