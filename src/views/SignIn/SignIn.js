import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SignIn.sass'
// helpers
import config from '../../config'
import { setToLocalStorage } from '../../token'
import getFingerprint from '../../fingerprint'
import { ReactComponent as FacbookIcon } from '../../assets/img/facebook-logo.svg'
import { ReactComponent as GoogleIcon } from '../../assets/img/google-logo.svg'
import { ReactComponent as GithubIcon } from '../../assets/img/github-logo.svg'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [browserFingerprint, setBrowserFingerprint] = useState('')

  useState(async () => {
    const fingerprint = await getFingerprint()
    setBrowserFingerprint(fingerprint)
  })

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

    const fingerprint = await getFingerprint()
    const payload = JSON.stringify({
      email, password, fingerprint
    })
    const signInUser = await fetch(`${config.apiUrl}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
    const response = await signInUser.json()

    if (response.data.accessToken) {
      setToLocalStorage('accessToken', response.data.accessToken)
      setToLocalStorage('refreshToken', response.data.refreshToken)
      setToLocalStorage('expireAt', response.data.expireAt)
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

      <div className="auth-social-networks">
        <a className="waves-effect waves-light btn" href={`${config.apiUrl}/auth/facebook?fingerprint=${browserFingerprint}`}>
          <FacbookIcon />
          Login with Facebook
        </a>
        <a className="waves-effect waves-light btn" href={`${config.apiUrl}/auth/google?fingerprint=${browserFingerprint}`}>
          <GoogleIcon />
          Login with Google
        </a>
        <a className="waves-effect waves-light btn" href={`${config.apiUrl}/auth/github?fingerprint=${browserFingerprint}`}>
          <GithubIcon />
          Login with Github
        </a>
      </div>
    </div>
  )
}

export default SignIn