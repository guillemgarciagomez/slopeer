// import {makeExecutableSchema} from 'apollo-server-express';
// import { gql } from 'apollo-server-express';
import mutationSchema from './mutation';
import querySchema from './query';
import typesSchema from './types';

//main problem in types is needed a folder with the name of the model webP,
//executable squema was giving squemas and so on double types 
export default  [mutationSchema, querySchema, typesSchema]
