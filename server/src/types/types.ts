import { ReadStream } from "fs-capacitor";

export interface PictureType {
  createReadStream (): ReadStream;
  filename: string;
}