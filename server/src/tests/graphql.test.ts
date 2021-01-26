
import { createTestClient } from 'apollo-server-testing';
import {ApolloServer } from  'apollo-server-express';
import {Request, Response} from 'express';
import mongoose from 'mongoose';
import casual from 'casual';
import {Route, User} from '../models/index';
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/schemas'
import {queries, mutations} from './__mocks__/queryAndMutations'

//mocking connection to DB and GraphQL
type express= {res:Response, req: Request}  
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }:express) => ({ req, res }),
  uploads: false
  
  // mocks:true,
  // mockEntireSchema: false,
});

const { DB_HOST,TestDB } = process.env;
const mongoDB:string =  `${DB_HOST}/${TestDB}`
async function connectToDB () {
  return await mongoose.connect(`${mongoDB}`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => console.log(`Connected database ${TestDB}, error: ${err} 🗄`)); //eslint-disable-line no-console
}

//functions to clean the database and close its connection
const dropTestDb = async () => {
  await mongoose.connection.db.dropDatabase().catch(error => console.error(error));
}

const closeDbConnection = async () => {
 await mongoose.connection.close().catch(error => console.error(error));
}
//copy of models

const userModel = User;
const routeModel = Route


beforeAll(async ()=> {
  await connectToDB()
  await dropTestDb()
});

afterAll(async ()=>{
  await dropTestDb();
  await closeDbConnection();
})


describe('Add new user', ()=> {
  
  const {query, mutate} = createTestClient(server as any);
  
 
 
  const mockUser = {
    username: casual.name,
    email: casual.email,
    password: casual.password
  }

  
  it('should get routes', async ()=> {
  const res = await query({query:queries.GET_ROUTES})
  console.log(res, 'res')
  expect(res).toMatchSnapshot();
  })
  

  //how to mutate...how do i compare with what is created in the DB 

  // it('should add a new user', async ()=>{
    
  //   const { data } = await mutate({
  //     mutation: mutations.REGISTER,
  //     variables: { 
  //       ...mockUser
  //     }
  //   })

  //   expect(data).toEqual({
  //     mutations.REGISTER: {
  //       ...mockUser
  //     }
  //   });
  // });

})