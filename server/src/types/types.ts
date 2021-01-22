import { ReadStream } from "fs-capacitor";

export interface PictureType {
  createReadStream (): ReadStream;
  filename: string;
}

export interface NewRouteType {
  name: string;
  grade: string;
  public: boolean;
  author: string;
  lat: string;
  lng: string;
  type: string;
  picture: string | boolean | number;
  description?: string;
}

export type ID = string;