import config from './config';
import mongoose from 'mongoose';
import Album from './models/Album';
import Artist from './models/Artist';
import Track from './models/Track';
import User from './models/User';
import { randomUUID } from 'node:crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (err) {
    console.log('Collections did not present');
  }

  const [linkinPark, skillet] = await Artist.create(
    {
      title: `Linkin Park`,
      image: 'fixtures/linkinPng.jpg',
    },
    {
      title: 'skillet',
      image: 'fixtures/skillet.png',
    },
  );

  const [linkinPark_1al, linkinPark_2al, skillet_1al, skillet_2al] = await Album.create(
    {
      title: 'Rising',
      artist: linkinPark,
      create_at: 2011,
      image: 'fixtures/linkin_1.jpg',
    },
    {
      title: 'Red Day',
      artist: linkinPark,
      create_at: 2011,
      image: 'fixtures/linkin_2.jpeg',
    },
    {
      title: 'Monster',
      artist: skillet,
      create_at: 2020,
      image: 'fixtures/skillet_1.jpg',
    },
    {
      title: 'Beast',
      artist: skillet,
      create_at: 2021,
      image: 'fixtures/skillet_2.jpg',
    },
  );

  await Track.create(
    {
      title: 'numb',
      track_number: 1,
      album: linkinPark_1al,
      duration: '2:23',
    },
    {
      title: 'numb',
      track_number: 2,
      album: linkinPark_1al,
      duration: '2:23',
    },
    {
      title: 'be Hero',
      track_number: 1,
      album: skillet_1al,
      duration: '3:44',
    },
    {
      title: 'Monster inside me',
      track_number: 2,
      album: skillet_1al,
      duration: '3:44',
    },
  );

  await User.create({
    username: 'Beka',
    password: '123456',
    token: randomUUID(),
  });

  await db.close();
};

run().catch(console.error);
