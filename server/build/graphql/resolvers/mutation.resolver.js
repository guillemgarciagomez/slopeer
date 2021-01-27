"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.updateRoute = exports.createRoute = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const route_model_1 = __importDefault(require("../../models/route.model"));
const { uploadProfilePicture, uploadRoutePicture } = require('../../utils/uploads');
const createRoute = async (_, { input }) => {
    const route = new route_model_1.default({ ...input, picture: null });
    if (input.picture) {
        const picturePath = await uploadRoutePicture(input.picture, route._id);
        route.picture = picturePath;
    }
    await route.save();
    await user_model_1.default.findByIdAndUpdate(input.author, { $push: { 'owned_routes': String(route._id) } }, { useFindAndModify: false });
    return route;
};
exports.createRoute = createRoute;
const updateRoute = async (_, { _id, input }) => {
    if (input.picture) {
        const picturePath = await uploadRoutePicture(input.picture, _id);
        input.picture = picturePath;
    }
    return await route_model_1.default.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};
exports.updateRoute = updateRoute;
exports.removeRoute = async (_, { _id }) => {
    const route = await route_model_1.default.findByIdAndDelete(_id);
    if (route)
        await user_model_1.default.findByIdAndUpdate(route.author, { $pull: { 'owned_routes': _id } }, { useFindAndModify: false });
    await user_model_1.default.updateMany({}, { $pull: { 'saved_routes': _id } });
    return route;
};
const createUser = async (_, { input: { email, username, password } }, { res }) => {
    let user = await user_model_1.default.findOne({ email });
    if (user) {
        res.status(409);
        return;
    }
    user = new user_model_1.default({ email, username, password, owned_routes: [], saved_routes: [] });
    const salt = await bcrypt_1.default.genSalt(10);
    user.password = await bcrypt_1.default.hash(user.password, salt);
    await user.save();
    return user.generateAuthToken();
};
exports.createUser = createUser;
exports.updateUser = async (_, { _id, input }) => {
    if (input.profile_picture) {
        const picturePath = await uploadProfilePicture(input.profile_picture, _id);
        input.profile_picture = picturePath;
    }
    return await user_model_1.default.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};
exports.saveRoute = async (_, { userId, routeId }) => await user_model_1.default.findByIdAndUpdate(userId, { $push: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });
exports.unsaveRoute = async (_, { userId, routeId }) => await user_model_1.default.findByIdAndUpdate(userId, { $pull: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });
exports.login = async (_, { email, password }, { res }) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        return;
    }
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword)
        return res.status(400);
    return user.generateAuthToken();
};
