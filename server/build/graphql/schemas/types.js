"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `

scalar FileUpload

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  profile_picture: String
  owned_routes: [Route]
  saved_routes: [Route]
}

type Route {
  _id: ID!
  name: String!
  grade: String!
  author: User!
  public: Boolean!
  lat: String!
  lng: String!
  type: String!
  picture: String
  description: String
}
`;
