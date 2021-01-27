import bcrypt from 'bcrypt';
import { Response } from 'express';
import User, { Iuser } from '../../models/user.model';
import Route, { Iroute } from '../../models/route.model';
const { uploadProfilePicture, uploadRoutePicture } = require('../../utils/uploads');
import { ID } from '../../types/types';

type Input = {
  _id?: ID;
  input: Iroute;
  routeId?: ID;
  userId?: ID;
}

type Res = {
  res: Response;
}

export const createRoute = async (_: any, { input }: Input) => {
  const route = new Route({ ...input, picture: null });

  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, route._id);
    route.picture = picturePath;

  }

  await route.save();
  await User.findByIdAndUpdate(input.author, { $push: { 'owned_routes': String(route._id) } },
    { useFindAndModify: false })
  return route;
};

export const updateRoute = async (_: any, { _id, input }: Input) => {
  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, _id);
    input.picture = picturePath;
  }
  return await Route.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};

exports.removeRoute = async (_: any, { _id }: Input) => {
  const route = await Route.findByIdAndDelete(_id);
  if (route) await User.findByIdAndUpdate(route.author, { $pull: { 'owned_routes': _id } }, { useFindAndModify: false });
  await User.updateMany({}, { $pull: { 'saved_routes': _id } });
  return route;
};
type createUserQuery = {
  input: { email: string; username: string; password: string }
}
export const createUser = async (_: any, { input: { email, username, password } }: createUserQuery, { res }: Res) => {
  let user = await User.findOne({ email });
  if (user) {
    res.status(409);
    return;
  }

  user = new User({ email, username, password, owned_routes: [], saved_routes: [] });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return user.generateAuthToken();
};

exports.updateUser = async (_: any, { _id, input }: any) => {
  if (input.profile_picture) {
    const picturePath = await uploadProfilePicture(input.profile_picture, _id);
    input.profile_picture = picturePath;
  }
  return await User.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};

exports.saveRoute = async (_: any, { userId, routeId }: Input) =>
  await User.findByIdAndUpdate(userId, { $push: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });


exports.unsaveRoute = async (_: any, { userId, routeId }: Input) =>
  await User.findByIdAndUpdate(userId, { $pull: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });

exports.login = async (_: any, { email, password }: Iuser, { res }: Res) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return;
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400);

  return user.generateAuthToken();
};
