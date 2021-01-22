import { Schema, model} from 'mongoose';
// const { Schema, model} = require('mongoose');
import {Document} from 'mongoose';
// const { Document} = require('mongoose');
const jwt = require('jsonwebtoken');
import {Iroute} from './route.model'; 

export interface Iuser extends Document {
  _id: string;
  email: string;
  username: String;
  password: String;
  profile_picture: String;
  owned_routes: Iroute[]; 
  saved_routes: Iroute[];
}
const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  owned_routes: { type: [{ type: String, ref: 'Route' }], default: [] },
  saved_routes: { type: [{ type: String, ref: 'Route' }], default: [] }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWTPrivateKey,
    { expiresIn: '3d' }
  );
  return token;
};

export default model<Iuser>('User', userSchema);
