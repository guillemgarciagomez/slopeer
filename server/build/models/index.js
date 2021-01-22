"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = exports.User = exports.Route = void 0;
const mongoose = require('mongoose');
exports.Route = require('./route.model');
exports.User = require('./user.model');
const { DB_HOST, DB } = process.env;
async function connection() {
    return await mongoose.connect(`${DB_HOST}/${DB}`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => console.log(`Connected database ${DB}, error: ${err} 🗄`));
}
exports.connection = connection;
