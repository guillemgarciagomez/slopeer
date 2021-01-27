
import { Router, Route } from 'preact-router'
import { h } from 'preact';

import { Footer } from '..'

// Code-splitting is automated for `routes` directory
import Map from '../../routes/map'
import Profile from '../../routes/profile'
// import Redirect from '../redirect'
import MyRoutes from '../../routes/myRoutes'
import RouteDetails from '../../routes/routeDetails'
import AddRoute from '../../routes/addRoute'
import EditProfile from '../../routes/editProfile'
import EditRoute from '../../routes/editRoute'

const AuthenticatedApp = () => (
  <div>
    <Router>
      <Route path='/map' component={Map}></Route>
      <Route path='/profile/:id' component={Profile}></Route>
      <Route path='/' component={MyRoutes}></Route>
      <Route path='/route/:id' component={RouteDetails}></Route>
      <Route path='/addRoute' component={AddRoute}></Route>
      <Route path='/editProfile' component={EditProfile}></Route>
      <Route path='/editRoute/:id' component={EditRoute}></Route>
      {/* <Redirect default to='/' /> */}
    </Router>
    <Footer />
  </div>
)

export default AuthenticatedApp
