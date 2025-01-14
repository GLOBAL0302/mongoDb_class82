export interface IArtists {
  _id: string;
  title: string;
  image: string | null;
}

export interface IAlbums {
  _id: string;
  title: string;
  artist: IArtists;
  create_at: number;
  image: string | null;
}

export interface ITracks {
  _id: string;
  title: string;
  track_number: number;
  album: IAlbums;
  duration: string;
}
