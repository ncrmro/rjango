import { postAuthRoute } from './utils'
const tokenName = 'jwtToken';

export function setToken(token) {
  // Used when login or sign up mutation returns a jwt token successfully
  localStorage.setItem(tokenName, token);
  window.location.replace(postAuthRoute);
  window.location.reload();
}

export function logoutViewer() {
  localStorage.removeItem(tokenName);
  window.location.replace('/');
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function isTokenExpired(parsedToken) {
  let isExpiredToken = false;

  const dateNow = new Date();
  const tokenExpiration = new Date(parsedToken.exp * 1000);
  if (tokenExpiration < dateNow.getTime()) {
    isExpiredToken = true;
  }
  return isExpiredToken;
}

/**
 * Check for valid jwtToken
 * @return {String} jwtToken
 */
export function hasValidJwtToken() {
  let token = localStorage.getItem(tokenName);
  let parsedToken = '';
  if (token) {
    parsedToken = parseJwt(token);
    if (isTokenExpired(parsedToken)) {
      localStorage.removeItem(tokenName);
      window.location.replace('/login');
      window.location.reload();
      token = null;
    }
  }
  return { token, parsedToken };
}