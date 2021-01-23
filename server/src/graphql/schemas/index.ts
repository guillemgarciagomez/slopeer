import {makeExecutableSchema} from 'apollo-server-express';
import mutationSchema from './mutation';
import querySchema from './query';
import typesSchema from './types';

export default makeExecutableSchema ({
  typeDefs: [mutationSchema, querySchema, typesSchema]
})
