import React from 'react'
import './App.sass'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

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
        <Route exact path="/" component={Main} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        
        {/* TODO: how must be declared ErrorBoundary component  */}
        <ProtectedRoute path="/create-employee" component={CreateEmployee} />
        <ProtectedRoute path="/employees-table" component={EmployeesList} />
        <ProtectedRoute path="/employee/:id" component={Profile} />
      </Switch>
    </div>
  </Router>
)

export default App