"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.route = exports.routes = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const route_model_1 = __importDefault(require("../../models/route.model"));
const routes = async (_, args) => await route_model_1.default.find({ ...args })
    .populate('author');
exports.routes = routes;
const route = async (_, { _id }) => await route_model_1.default.findById(_id).populate('author');
exports.route = route;
const user = async (_, { _id }) => await user_model_1.default.findById(_id)
    .populate('saved_routes')
    .populate('owned_routes');
exports.user = user;
