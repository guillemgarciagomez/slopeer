import { ApolloServer, gql } from 'apollo-server-express';
import {Request, Response} from 'express';
// import {Request} from 'supertest';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../src/models';
import resolvers from '../src/graphql/resolvers'
import models from '../src/models/index'
import typeDefs from '../src/graphql/schemas'


import {createTestClient} from 'apollo-server-testing';
import { Iuser } from '../src/models/user.model';

const { DB_HOST } = process.env;

const mongoDB:string =  `${DB_HOST}/testDatabase`

mongoose.connect(mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.catch(error => console.error(error)); 

// const dropTestDb = async () => {
//   await mongoose.connection.db.dropDatabase().catch(error => console.error(error));
// }

// const closeDbConnection = async () => {
//   await mongoose.connection.close().catch(error => console.error(error));;
// }
type express= {res:Response, req: Request}  

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    context: ({ req, res }:express) => ({ req, res }),
    uploads: false
  })
});

const { query, mutate } = createTestClient(server as any)
//testing test
const mockUser:Iuser = {
  email: 'test7@Empty.com',
username: 'test7',
password: 'test77',
profile_picture: '',
owned_routes: [],
saved_routes: []
}

const routeToBeAdded = {//mock route 
}
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
      
    }) 
  })

})
