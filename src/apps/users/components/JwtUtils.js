let jwtToken = localStorage.getItem("jwtToken");

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function getTokenExpirationDate(tokenExpirationTime) {
    var date = new Date(0);
    date.setUTCSeconds(tokenExpirationTime);
    return date

}
function dateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime
}

function timeRemaning() {
    var dateNow = new Date();

}

function timeDiff( tstart, tend ) {
    //http://stackoverflow.com/questions/18240806/how-can-i-find-hhmmss-difference-between-two-unix-timestamps
  var diff = (tend - tstart), units = [
    { d: 60, l: "seconds" },
    { d: 60, l: "minutes" },
    { d: 24, l: "hours" },
    { d: 7, l: "days" }
  ];

  var s = '';
  for (var i = 0; i < units.length; ++i) {
    s = (diff % units[i].d) + " " + units[i].l + " " + s;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

const jwt =  () => {
    let jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken && !Boolean(window.location.pathname === "/login")) {
        window.location.href = "/login"
    }
    console.log('onEnter', jwtToken);
};

const jwtTokenParam = () => {
    if (jwtToken) {
        const parsedToken = parseJwt(jwtToken);
        const currentDateUnixTime = Math.round(new Date().getTime()/1000);
        console.log("Current Date", currentDateUnixTime);
        const tokenTimeRemaning = timeDiff(currentDateUnixTime, parsedToken.exp);
        console.log(tokenTimeRemaning);

        console.log("Found JWT Token", parsedToken);
        console.log("Current Date Time", dateTime());
        console.log("Token Expiration Time", getTokenExpirationDate(parsedToken.exp));
        return jwtToken
    }
    else {
        console.log("jwtToken not set");

        jwtToken = "";
        return jwtToken
    }
};

export {
    jwtTokenParam
}