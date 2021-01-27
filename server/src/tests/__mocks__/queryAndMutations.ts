//Queries 

import { gql } from "apollo-server-express";

export const queries = {

GET_ROUTES: gql`
query{
  routes(public: true) {
    _id
    grade
    lat
    lng
  }
}`,

GET_USER_ROUTES: gql`
query ($_id: ID!) {
  user(_id: $_id) {
    _id
    owned_routes {
      _id
      name
      grade
      picture
      type
    }
    saved_routes {
      _id
      name
      grade
      picture
      type
    }
  }
}
`,
GET_ROUTE_DETAIL: gql`
  query ($_id: ID!) {
    route(_id: $_id) {
      _id
      name
      grade
      public
      picture
      author {
        _id
        username
      }
      type
      description
      lat
      lng
  }
  }
`,
GET_USER_DATA: gql`
query($_id: ID!) {
  user(_id: $_id) {
    _id
    username
    profile_picture
    owned_routes {
      _id
      name
      public
      grade
  }
  }
}`
}

//Mutations 
export const mutations = {

LOGIN: gql`
mutation($email: String!, $password:String!) {
  login(email: $email, password:$password)
}`,
REGISTER: gql`
mutation($email: String!, $username:String!, $password:String!) {
createUser(input: {email: $email, username: $username, password: $password})
}`,
SAVE_ROUTE: gql`
mutation($userId: ID!, $routeId: ID!) {
  saveRoute(userId: $userId, routeId: $routeId) {
    _id
    saved_routes {
      _id
    }
  }
}`,
UNSAVE_ROUTE : gql`
mutation($userId: ID!, $routeId: ID!) {
  unsaveRoute(userId: $userId, routeId: $routeId) {
    _id
    saved_routes {
      _id
    }
  }
}`,
CREATE_ROUTE : gql`
mutation($name: String!, $grade: String!, $public:Boolean!, $author: ID!, $lat: String!, $lng: String!, $type: String!, $picture: FileUpload, $description: String) {
  createRoute(input: {
    name: $name,
    grade: $grade,
    public: $public,
    author: $author,
    lat: $lat,
    lng: $lng,
    type: $type,
    picture: $picture,
    description: $description
  }) {
    _id
  }
}`,
UPDATE_ROUTE: gql`
mutation($_id: ID!, $name: String!, $grade: String!, $public:Boolean!, $type: String!, $picture: FileUpload, $description: String) {
updateRoute(
  _id: $_id,
  input: {
  name: $name,
  grade: $grade,
  public: $public,
  type: $type,
  picture: $picture,
  description: $description
}) {
  _id
}
}`, 
UPDATE_USER:  gql`
mutation($_id:ID! ,$username: String!, $profile_picture: FileUpload){
updateUser(_id:$_id, input: {username: $username, profile_picture:$profile_picture}){
  _id
}
}`
}