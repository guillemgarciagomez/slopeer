'use strict';
import { Schema, model, Document } from 'mongoose';
import { Iuser } from './user.model'




export interface Iroute extends Document {
  _id: String;
  name: String;
  grade: String;
  author: Iuser;
  public: Boolean;
  picture: String;
  description: String;
  type: String;
  lat: String;
  lng: String;
}

const routeSchema: Schema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  public: { type: Boolean, default: true },
  picture: { type: String, default: null },
  description: { type: String, default: null },
  type: { type: String, default: null },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

export default model<Iroute>('Route', routeSchema);
