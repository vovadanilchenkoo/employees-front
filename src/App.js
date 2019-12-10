import React from 'react'
import './App.sass'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import Header from './components/Header/Header'
import Main from './views/Main/Main'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'
import CreateEmployee from './views/CreateEmployee/CreateEmployee'
import EmployeesList from './views/EmployeesList/EmployeesList'
import Profile from './views/Profile/Profile'


const App = () => (
  <Router>
    <Header />
    <div className="container">
      <Switch>
        {/* TODO: protect auth routes */}
          <Route exact path="/" component={Main} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-employee" component={CreateEmployee} />
          {/* TODO: how must be declared ErrorBoundary component  */}
          <Route path="/employees-table" component={EmployeesList} />
          <Route path="/employee/:id" component={Profile} />
      </Switch>
    </div>
  </Router>
)

export default App