import{ gql } from 'apollo-server-express'

export default gql`
  type Query {
    routes(author: ID public: Boolean): [Route]!
    route(_id: ID!): Route
    user(_id: ID!): User
  }
`;
