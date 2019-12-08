import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { config } from '../../config'

const Header = () => {
    const [accessToken, setAccessToken] = useState(window.localStorage.getItem('accessToken'))
    const history = useHistory()

    useEffect(() => {
      setAccessToken(window.localStorage.getItem('accessToken'))
    })

    const logout = async () => {
        const request = await fetch(`${config.apiUrl}/user/logout`, {
            headers: {
                'x-access-token': `${window.localStorage.getItem('accessToken')}`
            }
        })
        const response = await request.json()

        history.push('/')
        window.localStorage.removeItem('accessToken')
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
                            <Link to="/logout" onClick={logout} className="content__page-link">Logout</Link>
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