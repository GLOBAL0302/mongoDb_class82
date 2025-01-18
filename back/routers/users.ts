import express from 'express';
import {Error} from "mongoose"
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';

const usersRouter = express.Router();


usersRouter.post('/register', async (req, res, next) => {
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    })

    user.generateToken();

    await user.save();
    res.status(200).send({message:"Register successful", user});
  }catch(error){
    if(error instanceof Error.ValidationError){
      res.status(400).send(error)
      return
    }
    next(error);
  }
});



usersRouter.post("/sessions", async(req, res, next)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if(!user){
      res.status(400).send({error: 'No user with that username'});
      return
    }

    const isMatch =  await user.checkPassword(req.body.password);
    if(!isMatch){
      res.status(400).send({error: 'Password is incorrect'});
      return
    }

    user.generateToken();
    await user.save();
    res.status(200).send({message:"Username and password are correct ", user});
  }catch(error){
    if(error instanceof Error.ValidationError){
      res.status(400).send({error: error.message});
      return
    }

    next(error)
  }
})




usersRouter.delete('/sessions', auth, async (req, res, next)=>{
  let reqWithAuth = req as RequestWithUser;
  const userFromAuth = reqWithAuth.user
  try{
    const user = await User.findOne({_id:userFromAuth._id});
    if(user){
      user.generateToken();
      await user.save();
      res.send({message:"Successfully logged out form your Account"});
    }

  }catch(error){
    next(error)
  }
});


export default usersRouter;



