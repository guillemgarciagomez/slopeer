"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const mutation_1 = __importDefault(require("./mutation"));
const query_1 = __importDefault(require("./query"));
const types_1 = __importDefault(require("./types"));
exports.default = apollo_server_express_1.makeExecutableSchema({
    typeDefs: [mutation_1.default, query_1.default, types_1.default]
});
