export interface Form {
  email: string,
  password: string
};

export interface User {
  avatar: string,
  email: string,
  first_name: string,
  id: number,
  last_name: string
};

export type Prop = {
  [key: string]: any
};

export interface PictureType {
  author: string,
  download_url: string,
  heigth: number,
  id: string,
  url: string,
  width: number
};
