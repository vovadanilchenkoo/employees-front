import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SignIn.sass'
import { config } from '../../config'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const setData = (e) => {
        const targetEl = e.target.id
        if (targetEl === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const signIn = async (e) => {
        e.preventDefault()

        const payload = JSON.stringify({
            email, password
        })
        const signInUser = await fetch(`${config.apiUrl}/user/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
        const response = await signInUser.json()

        if (response.token) {
            window.localStorage.setItem('accessToken', response.token)
            history.push('/employees-table')
        }
    }

    return (
      <div className="sign-in-wrap">
          <h1 className="center-align">Sign in</h1>
          <form className="sign-in-form">
              <div className="sign-in-item input-field col s6">
                  <input id="email" onChange={setData} type="text" />
                  <label htmlFor="email">Email</label>
              </div>
              <div className="sign-in-item input-field col s6">
                  <input id="password" onChange={setData} type="password" />
                  <label htmlFor="password">Password</label>
              </div>
              <button 
                  type="submit"
                  onClick={signIn}
                  className="btn waves-effect waves-light" 
              >
                  Submit
                  <i className="material-icons right">send</i>
              </button>
          </form>
      </div>
    )
}

export default SignIn