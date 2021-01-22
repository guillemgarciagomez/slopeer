"use strict";
const mongoose = require('mongoose');
const Route = require('./route.model');
const User = require('./user.model');
const { DB_HOST, DB } = process.env;
async function connection() {
    return await mongoose.connect(`${DB_HOST}/${DB}`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => console.log(`Connected database ${DB}, error: ${err} 🗄`));
}
module.exports = {
    connection,
    Route,
    User
};
