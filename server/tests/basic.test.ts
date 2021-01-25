import {Request} from 'supertest';
import mongoose from 'mongoose';
import connection from '../src/index';
import { User } from '../src/models';
import { textSpanIsEmpty } from 'typescript';
import Resolvers from '../src/graphql/resolvers/index'
import models from '../src/models/index'


import {createTestClient} from 'apollo-server-testing';
import { Iuser } from '../src/models/user.model';
const { query, mutate } = createTestClient(server)
const { DB_HOST } = process.env;
const mongoDB:string =  `${DB_HOST}/testDatabase`
mongoose.connect(mongoDB, { useNewUrlParser: true });


//testing test
describe('User model test', ()=>{
  //clear out database 
  beforeAll(async () => {
    await User.remove({})
  });
  //clear user after test so DB is fresh 
  afterEach(async ()=> {
    await User.remove({})
  })

  // stop connection to DB 
  afterAll(async ()=> {
    await mongoose.connection.close();
  })

  it('has a module', ()=> {
    expect(User).toBeDefined();
  })
  
  describe('get user', ()=>{
    it('gets a user', async ()=> {
      const user:Iuser = {
        email: 'test7@Empty.com',
  username: 'test7',
  password: 'test77',
  profile_picture: '',
  owned_routes: [],
  saved_routes: []
      }
    }) 
  })

})
