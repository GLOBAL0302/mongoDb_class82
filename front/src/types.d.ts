export interface IUser {
  username: string;
  password: string;
  token: string;
  displayName: string;
  image:string
}

export interface IArtistsMutation {
  title: string;
  image: string | null;
  description: string;
}


export interface IArtists extends IArtistsMutation {
  _id: string;
}


export interface IAlbumsMutation{
  title: string;
  image: string | null;
  create_at:string
  artist:string
}

export interface IAlbums{
  _id: string;
  artist: IArtists;
  title: string;
  image: string | null;
  create_at:string
}

export interface ITracks {
  _id: string;
  title: string;
  track_number: number;
  album: IAlbums;
  duration: string;
}

export interface ITrackHistory {
  _id: string;
  dateTime: string;
  track: ITracks;
  user: string;
}

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
