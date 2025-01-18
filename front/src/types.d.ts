export interface IUser {
  username: string;
  password: string;
  token: string;
}

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
