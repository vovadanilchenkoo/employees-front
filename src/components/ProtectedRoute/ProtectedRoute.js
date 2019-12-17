import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return (
    <Route 
      {...rest}
      render={routeProps => {
        return accessToken !== null ?
          <Component {...routeProps} /> : <Redirect to={{pathname: "/sign-in"}} />
      }}
    />
  )
}

export default ProtectedRoute