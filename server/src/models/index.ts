const mongoose = require('mongoose');
import {Iroute} from './route.model';
import {Iuser} from './user.model'; 
export const Route:Iroute = require('./route.model');
export const User:Iuser = require('./user.model');

const { DB_HOST, DB } = process.env;

export async function connection () {
  return await mongoose.connect(`${DB_HOST}/${DB}`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err:string) => console.log(`Connected database ${DB}, error: ${err} 🗄`)); //eslint-disable-line no-console
}



