"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("graphql-upload/index");
const apollo_server_express_1 = require("apollo-server-express");
const jwtCheck_1 = __importDefault(require("../middleware/jwtCheck"));
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: require('./schemas'),
    resolvers: require('./resolvers'),
    context: ({ req, res }) => ({ req, res }),
    uploads: false
});
const app = express_1.default();
app.use(cors_1.default(), express_1.default.static('public'), jwtCheck_1.default, index_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 11 }));
server.applyMiddleware({ app });
exports.default = app;
