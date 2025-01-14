export interface IArtists{
  _id: string;
  title: string;
  image: string | null
}

export interface IAlbums{
  _id:string,
  title:string,
  artists:string
  create_at:number
  image:string | null
}