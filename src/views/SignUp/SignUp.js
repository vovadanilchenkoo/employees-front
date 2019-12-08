import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SignUp.sass'
import { config } from '../../config'

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

        const payload = JSON.stringify({
            email, password
        })
        const createUser = await fetch(`${config.apiUrl}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
        const res = await createUser.json()
        
        if (res.token) {
            window.localStorage.setItem('accessToken', res.token)
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