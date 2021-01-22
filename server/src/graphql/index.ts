import express from 'express';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload/index';
import { ApolloServer } from 'apollo-server-express';
import jwtCheck from '../middleware/jwtCheck';

const server = new ApolloServer({
  typeDefs: require('./schemas'),
  resolvers: require('./resolvers'),
  context: ({ req, res }) => ({ req, res }),
  uploads: false
});

const app = express();

app.use(
  cors(),
  express.static('public'),
  jwtCheck,
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 11 }));

server.applyMiddleware({ app });

module.exports = app;
