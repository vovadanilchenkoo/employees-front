import React, { useEffect } from 'react'

const Main = (props) => {
  useEffect(() => {
    if( window.location.search.includes('?token=') ) {
      if (window.location.hash && window.location.hash == '#_=_') {
        window.location.hash = '';
      }
      // remove "token" substring from query string
      const accessToken = props.location.search.replace(/\?token\=/,'')
      window.localStorage.setItem('accessToken', accessToken)
    }
  }, [props.location.search])

  return (
    <h1 className="center-align">Welcome to react CRUD app using Node, PostgreSQL, Redis on backend</h1>
  )
}

export default Main