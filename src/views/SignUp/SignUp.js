import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SignUp.sass'
import config from '../../config'
import getFingerprint from '../../fingerprint'
import { setToLocalStorage } from '../../token'

const SignUp = () => {
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

  const signUp = async (e) => {
    e.preventDefault()

    const fingerprint = await getFingerprint()

    const payload = JSON.stringify({
      email, password, fingerprint
    })
    const createUser = await fetch(`${config.apiUrl}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
    const response = await createUser.json()
    
    if (response.data.accessToken) {
      setToLocalStorage('accessToken', response.data.accessToken)
      setToLocalStorage('refreshToken', response.data.refreshToken)
      setToLocalStorage('expireAt', response.data.expireAt)
      history.push('/employees-table')
    }
  }

  return (
    <div className="sign-up-wrap">
      <h1 className="center-align">Sign up</h1>
      <form className="sign-up-form">
        <div className="sign-up-item input-field col s6">
          <input id="email" onChange={setData} type="text" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="sign-up-item input-field col s6">
          <input id="password" onChange={setData} type="password" />
          <label htmlFor="password">Password</label>
        </div>
        <button 
          type="submit" 
          name="action"
          onClick={signUp}
          className="btn waves-effect waves-light" 
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default SignUp