import React, { useEffect, useState } from 'react'
import './App.sass'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import { setToLocalStorage } from './token'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Header from './components/Header/Header'
import Main from './views/Main/Main'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'
import CreateEmployee from './views/CreateEmployee/CreateEmployee'
import EmployeesList from './views/EmployeesList/EmployeesList'
import Profile from './views/Profile/Profile'
import Notification from './components/Notification/Notification'

// TODO: 
// 1. Front end breaks due to an error. FIX IT
// 2. If http response don't have data show notification that data for current user is empty
// 3. Pass props to ProtectedRoute component
const App = () => {
  const history = useHistory()
  const [notificationData, setNotificationData] = useState({
    isShow: false,
    value: ''
  })

  // after oauth authentication we have accessToken that need exists in localStorage to use protected routes
  useEffect(() => {
    const queryString = window.location.search
    const accessToken = new URLSearchParams(queryString).get('accessToken')
    const refreshToken = new URLSearchParams(queryString).get('refreshToken')
    const expireAt = new URLSearchParams(queryString).get('expireAt')

    if(accessToken) {
      setToLocalStorage('accessToken', accessToken)
      setToLocalStorage('refreshToken', refreshToken)
      setToLocalStorage('expireAt', expireAt)
      history.push('/employees-table')
    }
  }, [])

  return (
    <>
      <Header 
        notificationData={notificationData} 
        setNotificationData={setNotificationData}
      />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          
          {/* TODO: how must be declared ErrorBoundary component  */}
          <ProtectedRoute 
            path="/create-employee" 
            component={CreateEmployee} 
            notificationData={notificationData} 
            setNotificationData={setNotificationData}
          />
          <ProtectedRoute 
            path="/employees-table" 
            component={EmployeesList} 
            notificationData={notificationData} 
            setNotificationData={setNotificationData}
          />
          <ProtectedRoute 
            path="/employee/:id" 
            component={Profile} 
            notificationData={notificationData} 
            setNotificationData={setNotificationData}
          />
        </Switch>
      </div>
      <Notification show={notificationData.isShow} value={notificationData.value} />
    </>
  )
}

export default App