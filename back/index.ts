import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import mongoDb from './mongoDb';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';

import config from './config';
import track_historyRouter from './routers/track_history';
import usersRouter from './routers/users';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/track_history', track_historyRouter);
app.use('/users', usersRouter);


const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

run().catch((err) => {
  console.error(err);
});
