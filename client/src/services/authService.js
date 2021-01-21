import { client, mutations } from './graphqlService';

const login = async (credentials) => {
  return await client.mutation(mutations.login, credentials)
    .toPromise();
}

const register = async (userData) => {
  console.log('trying to register! with', userData);
  return await client.mutation(mutations.register, userData)
    .toPromise();
}

export { login, register }
