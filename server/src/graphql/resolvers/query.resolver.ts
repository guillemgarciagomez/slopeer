import  User  from '../../models/user.model';
import Route  from '../../models/route.model';



export const routes = async (_:any, args:[string]) =>
  await Route.find({ ...args })
    .populate('author');

export const route = async (_:any, { _id }) => await Route.findById(_id).populate('author');

export const user = async (_:any, { _id }) =>
  await User.findById(_id)
    .populate('saved_routes')
    .populate('owned_routes');
