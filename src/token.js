import config from './config'
import getFingerprint from './fingerprint'

// TODO: 
// 1. write logic for checking accessToken  expiration date, if token expired refresh token and send request with new accessToken
// 2. how securely store accessToken
const getFromLocalStorage = (property) => {
  return window.localStorage.getItem(property)
}

const setToLocalStorage = (property, value) => {
  window.localStorage.setItem(property, value)
}

// const setTokenExpirationDate = date => {
//   window.localStorage.setItem('expireAt', date)
// }

const isTokenEpired = async () => {
  // expireAt stored in seconds, so convert current date in milliseconds to seconds
  const expireAt = window.localStorage.getItem('expireAt')
  const currentDate = Date.now() / 1000

  if(!expireAt) {
    return "Expiration date doesn't exists"
  } else {
    if(expireAt <= currentDate) {
      const fingerprint = await getFingerprint()
      const request = await fetch(`${config.apiUrl}/auth/refresh-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${getFromLocalStorage('accessToken')}`,
        },
        body: JSON.stringify({
          accessToken: `${getFromLocalStorage('accessToken')}`,
          refreshToken: `${getFromLocalStorage('refreshToken')}`,
          fingerprint
        })
      })
      const response = await request.json()
      setToLocalStorage('accessToken', response.data.accessToken)
      setToLocalStorage('refreshToken', response.data.refreshToken)
      setToLocalStorage('expireAt', response.data.expireAt)

      if(response.data.accessToken) {
        return response.data
      } else {
        return 'Access token is not received'
      }

    } else {
      // this meaning that token not expired
      return false
    }
  }
}

export { getFromLocalStorage, setToLocalStorage, isTokenEpired }