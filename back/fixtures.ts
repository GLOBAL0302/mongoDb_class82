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
      title: 'Meteora',
      artist: linkinPark,
      create_at: 2011,
      image: 'fixtures/linkin_1.png',
    },
    {
      title: 'Hybrid Theory',
      artist: linkinPark,
      create_at: 2022,
      image: 'fixtures/linkin_2.jpeg',
    },

    {
      title: 'Comatose',
      artist: skillet,
      create_at: 2020,
      image: 'fixtures/skillet_1.jpg',
    },
    {
      title: 'Collide',
      artist: skillet,
      create_at: 2021,
      image: 'fixtures/skillet_2.jpg',
    },
  );

  await Track.create(
    {
      title: 'Foreworld',
      track_number: 1,
      album: linkinPark_1al,
      duration: '2:00',
    },
    {
      title: 'Hit the floor',
      track_number: 2,
      album: linkinPark_1al,
      duration: '2:23',
    },
    {
      title: 'Dont Stay',
      track_number: 3,
      album: linkinPark_1al,
      duration: '2:00',
    },
    {
      title: 'Figure 009',
      track_number: 4,
      album: linkinPark_1al,
      duration: '2:35',
    },
    {
      title: 'Faint',
      track_number: 5,
      album: linkinPark_1al,
      duration: '2:35',
    },

    {
      title: 'Papercut',
      track_number: 1,
      album: linkinPark_2al,
      duration: '2:34',
    },
    {
      title: 'With you',
      track_number: 2,
      album: linkinPark_2al,
      duration: '2:45',
    },
    {
      title: 'Crawling',
      track_number: 3,
      album: linkinPark_2al,
      duration: '2:36',
    },
    {
      title: 'By Myself',
      track_number: 4,
      album: linkinPark_2al,
      duration: '2:45',
    },
    {
      title: 'Crawling',
      track_number: 5,
      album: linkinPark_2al,
      duration: '2:23',
    },

    {
      title: 'Yours to Hold',
      track_number: 1,
      album: skillet_1al,
      duration: '3:24',
    },

    {
      title: 'Comatose',
      track_number: 2,
      album: skillet_1al,
      duration: '3:24',
    },
    {
      title: 'Those Nights',
      track_number: 3,
      album: skillet_1al,
      duration: '3:24',
    },

    {
      title: 'The last Night',
      track_number: 4,
      album: skillet_1al,
      duration: '3:54',
    },

    {
      title: 'The older I get',
      track_number: 5,
      album: skillet_1al,
      duration: '3:34',
    },

    {
      title: 'The last Night',
      track_number: 1,
      album: skillet_2al,
      duration: '3:44',
    },
    {
      title: 'My Obsession',
      track_number: 2,
      album: skillet_2al,
      duration: '3:33',
    },
    {
      title: 'Fingermails',
      track_number: 3,
      album: skillet_2al,
      duration: '3:25',
    },
    {
      title: 'Finger mails',
      track_number: 4,
      album: skillet_2al,
      duration: '3:28',
    },
    {
      title: 'Under My Skin',
      track_number: 5,
      album: skillet_2al,
      duration: '3:21',
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
