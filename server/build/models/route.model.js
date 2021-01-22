'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const routeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    grade: { type: String, required: true },
    author: { type: String, ref: 'User', required: true },
    public: { type: Boolean, default: true },
    picture: { type: String, default: null },
    description: { type: String, default: null },
    type: { type: String, default: null },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
});
exports.default = mongoose_1.model('Route', routeSchema);
