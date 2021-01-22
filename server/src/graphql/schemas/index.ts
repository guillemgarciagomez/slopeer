import { gql } from 'apollo-server-express';

module.exports = gql`
  ${require('./query.gql')}
  ${require('./mutation.ts')}
  ${require('./types.gql')}
`;
