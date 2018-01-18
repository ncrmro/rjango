import Storage from './Storage'
import base64 from 'base-64'
const tokenName = 'jwtToken'
export function setToken(token, login) {
  // Used when login or sign up mutation returns a jwt token successfully
  Storage.setItem(tokenName, token).then(login)

}

export function logoutViewer(signout) {
  Storage.removeItem(tokenName).then(signout)
}

function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64string = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(base64.decode(base64string))
}

function isTokenExpired(parsedToken) {
  let isExpiredToken = false

  const dateNow = new Date()
  const tokenExpiration = new Date(parsedToken.exp * 1000)
  if (tokenExpiration < dateNow.getTime()) {
    isExpiredToken = true
  }
  return isExpiredToken
}

async function hasValidJwtToken() {
  let token = await Storage.getItem(tokenName)
  let parsedToken = ''
  if (token) {
    parsedToken = parseJwt(token)
    if (isTokenExpired(parsedToken)) {
      logoutViewer()
      token = null
    }
  }
  return { token, parsedToken }
}
export { hasValidJwtToken }