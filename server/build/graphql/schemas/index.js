"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
module.exports = apollo_server_express_1.gql `
  ${require('./query.gql')}
  ${require('./mutation.ts')}
  ${require('./types.gql')}
`;
