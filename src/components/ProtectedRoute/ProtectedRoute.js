import React from 'react'
import { Route, Redirect, Router } from 'react-router-dom'
import { getFromLocalStorage } from '../../token'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const accessToken = getFromLocalStorage('accessToken')
  
  return (
    <Route 
      {...rest}
      render={routeProps => {
        const componentProps = {
          ...routeProps, ...rest
        }
        return accessToken !== null 
          ? <Component {...componentProps} /> 
          : <Redirect to={{pathname: "/sign-in"}} />
      }}
    />
  )
}

export default ProtectedRoute