import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getFromLocalStorage, isTokenEpired } from '../../token'
import config from '../../config'

const Header = (props) => {
  const [accessToken, setAccessToken] = useState(getFromLocalStorage('accessToken'))
  const history = useHistory()

  useEffect(() => {
    setAccessToken(getFromLocalStorage('accessToken'))
  })

  const logout = async () => {
    await isTokenEpired()
    
    const request = await fetch(`${config.apiUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${getFromLocalStorage('accessToken')}`
      },
      body: JSON.stringify({
        accessToken: getFromLocalStorage('accessToken')
      })
    })
    const response = await request.json()
    
    history.push('/')
    if(response.success) {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
      window.localStorage.removeItem('expireAt')

      props.setNotificationData({
        isShow: true,
        value: response.message
      })
      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false, value: ''}
        })
      }, 5000)
    } else {
      props.setNotificationData({
        isShow: true,
        value: response.message
      })
      
      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false, value: ''}
        })
      }, 5000)
    }
  }

  return (
    <header>
      <nav className="nav">
        <div className="container">
          <Link to="/" className="content__page-link">Main</Link>
          {
            accessToken !== null ?
              <>
                <Link to="/employees-table" className="content__page-link">Employees table</Link>
                <Link to="/create-employee" className="content__page-link">Create employee</Link>
                <Link to="/auth/logout" onClick={logout} className="content__page-link">Logout</Link>
              </> :
              <>
                <Link to="/sign-in" className="content__page-link">
                  <i className="material-icons">input</i>
                  Sign in
                </Link>
                <Link to="/sign-up" className="content__page-link">
                  <i className="material-icons">group_add</i>
                  Sign up
                </Link>
              </>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header