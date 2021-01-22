"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const getRoutes = async (_id, routes) => {
    const user = await user_model_1.default.findById(_id).populate(routes);
    return user;
};
exports.get_owned_routes = async ({ _id }) => {
    if (_id)
        return await getRoutes(_id, 'owned_routes');
    else
        return 1;
};
exports.get_saved_routes = async ({ _id }) => {
    if (_id)
        return await getRoutes(_id, 'saved_routes');
    else
        return 1;
};
exports.get_author = async ({ author: id }) => {
    if (id)
        return await user_model_1.default.findById(id);
    else
        return 1;
};
