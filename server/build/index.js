"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const index_1 = __importDefault(require("./graphql/index"));
const index_2 = require("./models/index");
index_2.connection()
    .then(() => {
    index_1.default
        .listen(4000, () => {
        console.log('🚀  Server ready at http://localhost:4000/graphql');
    });
})
    .catch(console.error);
