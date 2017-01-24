let jwtToken = localStorage.getItem("jwtToken");

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default function jwtTokenParam() {
  if (jwtToken) {
    const parsedToken = parseJwt(jwtToken);
    console.log("Found JWT Token", parsedToken);
    console.log("Token Expiration Time", parsedToken.exp);

    return {
      jwtToken
    }
  }
  else {
    console.log("jwtToken not set");

    jwtToken = "";
    return {
      jwtToken
    }
  }
}
