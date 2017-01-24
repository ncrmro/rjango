let jwtToken = localStorage.getItem("jwtToken");

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
function getExpirationDate(parsedToken) {
  var date = new Date(0);
  date.setUTCSeconds(parsedToken.exp);
  return date

}
function dateTime() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return dateTime
}

export default function jwtTokenParam() {
  if (jwtToken) {
    const parsedToken = parseJwt(jwtToken);
    console.log("Found JWT Token", parsedToken);

    console.log("Current Date Time", dateTime());
    console.log("Token Expiration Time", getExpirationDate(parsedToken));


    return jwtToken

  }
  else {
    console.log("jwtToken not set");

    jwtToken = "";
    return jwtToken


  }
}
