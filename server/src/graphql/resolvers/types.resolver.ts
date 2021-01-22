import User from '../../models/user.model';
import { ID } from '../../types/types';

type Input = {
  _id?: ID;
  author?: string;
}


const getRoutes = async (_id: ID, routes: string) => {
  const user = await User.findById(_id).populate(routes);
  return user;
};


exports.get_owned_routes = async ({ _id }: Input) => {
  if (_id) return await getRoutes(_id, 'owned_routes');
  else return 1;
}

exports.get_saved_routes = async ({ _id }: Input) => {
  if (_id) return await getRoutes(_id, 'saved_routes');
  else return 1;
}

exports.get_author = async ({ author: id }: Input) => {
  if (id) return await User.findById(id);
  else return 1;
};
