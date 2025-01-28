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

  const [linkinPark, skillet, bigBang] = await Artist.create(
    {
      title: `Linkin Park`,
      image: 'fixtures/linkinPng.jpg',
      isPublished: true,
    },
    {
      title: 'skillet',
      image: 'fixtures/skillet.png',
      isPublished: true,
    },
    {
      title: 'BigBang',
      image: 'fixtures/kpop.JPG',
      isPublished: false,
    },
  );

  const [linkinPark_1al, linkinPark_2al, skillet_1al, skillet_2al, bigBang_1al] = await Album.create(
    {
      title: 'Meteora',
      artist: linkinPark,
      create_at: 2011,
      image: 'fixtures/linkin_1.png',
      isPublished: true,
    },
    {
      title: 'Hybrid Theory',
      artist: linkinPark,
      create_at: 2022,
      image: 'fixtures/linkin_2.jpeg',
      isPublished: true,
    },
    {
      title: 'Comatose',
      artist: skillet,
      create_at: 2020,
      image: 'fixtures/skillet_1.jpg',
      isPublished: true,
    },
    {
      title: 'Collide',
      artist: skillet,
      create_at: 2021,
      image: 'fixtures/skillet_2.jpg',
      isPublished: true,
    },
    {
      title: 'Made Series',
      artist: bigBang,
      create_at: 2021,
      image: 'fixtures/kpop_1.jpg',
      isPublished: false,
    },
  );

  await Track.create(
    {
      title: 'Loser',
      track_number: 2,
      album: bigBang_1al,
      duration: '2:55',
      isPublished: false,
    },
    {
      title: 'If you',
      track_number: 1,
      album: bigBang_1al,
      duration: '2:24',
      isPublished: false,
    },
    {
      title: 'Bae Bae',
      track_number: 4,
      album: bigBang_1al,
      duration: '2:30',
      isPublished: false,
    },

    {
      title: 'Foreworld',
      track_number: 2,
      album: linkinPark_1al,
      duration: '2:00',
      isPublished: true,
    },
    {
      title: 'Hit the floor',
      track_number: 1,
      album: linkinPark_1al,
      duration: '2:23',
      isPublished: true,
    },
    {
      title: 'Dont Stay',
      track_number: 5,
      album: linkinPark_1al,
      duration: '2:00',
      isPublished: true,
    },
    {
      title: 'Figure 009',
      track_number: 3,
      album: linkinPark_1al,
      duration: '2:35',
      isPublished: true,
    },
    {
      title: 'Faint',
      track_number: 4,
      album: linkinPark_1al,
      duration: '2:35',
      isPublished: true,
    },

    {
      title: 'Papercut',
      track_number: 2,
      album: linkinPark_2al,
      duration: '2:34',
      isPublished: true,
    },
    {
      title: 'With you',
      track_number: 3,
      album: linkinPark_2al,
      duration: '2:45',
      isPublished: true,
    },
    {
      title: 'Crawling',
      track_number: 1,
      album: linkinPark_2al,
      duration: '2:36',
      isPublished: true,
    },
    {
      title: 'By Myself',
      track_number: 5,
      album: linkinPark_2al,
      duration: '2:45',
      isPublished: true,
    },
    {
      title: 'Crawling',
      track_number: 4,
      album: linkinPark_2al,
      duration: '2:23',
      isPublished: true,
    },

    {
      title: 'Yours to Hold',
      track_number: 2,
      album: skillet_1al,
      duration: '3:24',
      isPublished: true,
    },

    {
      title: 'Comatose',
      track_number: 1,
      album: skillet_1al,
      duration: '3:24',
      isPublished: true,
    },
    {
      title: 'Those Nights',
      track_number: 3,
      album: skillet_1al,
      duration: '3:24',
      isPublished: true,
    },

    {
      title: 'The last Night',
      track_number: 4,
      album: skillet_1al,
      duration: '3:54',
      isPublished: true,
    },

    {
      title: 'The older I get',
      track_number: 5,
      album: skillet_1al,
      duration: '3:34',
      isPublished: true,
    },

    {
      title: 'The last Night',
      track_number: 1,
      album: skillet_2al,
      duration: '3:44',
      isPublished: true,
    },
    {
      title: 'My Obsession',
      track_number: 4,
      album: skillet_2al,
      duration: '3:33',
      isPublished: true,
    },
    {
      title: 'Fingermails',
      track_number: 3,
      album: skillet_2al,
      duration: '3:25',
      isPublished: true,
    },
    {
      title: 'Finger mails',
      track_number: 2,
      album: skillet_2al,
      duration: '3:28',
      isPublished: true,
    },
    {
      title: 'Under My Skin',
      track_number: 5,
      album: skillet_2al,
      duration: '3:21',
      isPublished: true,
    },
  );

  await User.create(
    {
      username: 'kuba',
      password: '123456',
      role: 'admin',
      token: randomUUID(),
    },
    {
      username: 'Beka',
      password: '123456',
      role: 'user',
      token: randomUUID(),
    },
  );

  await db.close();
};

run().catch(console.error);
