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
function hasValidJwtToken() {
  let jwtToken = localStorage.getItem('jwtToken');
  let parsedToken = '';
  if (jwtToken) {
    parsedToken = parseJwt(jwtToken);
    const isJwtTokenExpired = isTokenExpired(parsedToken);
    if (isJwtTokenExpired) {
      localStorage.removeItem('jwtToken');
      window.location.replace('/account/login');
      window.location.reload();
      jwtToken = null;
    }
  }
  return { jwtToken, parsedToken };
}

export default hasValidJwtToken;
