/* eslint-disable */

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function getTokenExpirationDate(tokenExpirationTime) {
  const date = new Date(0);
  date.setUTCSeconds(tokenExpirationTime);
  return date;
}
function dateTime() {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
}

function timeRemaning() {
  const dateNow = new Date();
}

function timeDiff(tstart, tend) {
    // http://stackoverflow.com/questions/18240806/how-can-i-find-hhmmss-difference-between-two-unix-timestamps
  let diff = (tend - tstart),
    units = [
    { d: 60, l: 'seconds' },
    { d: 60, l: 'minutes' },
    { d: 24, l: 'hours' },
    { d: 7, l: 'days' }
    ];

  let s = '';
  for (let i = 0; i < units.length; ++i) {
    s = `${diff % units[i].d} ${units[i].l} ${s}`;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

const jwt = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (!jwtToken && !(window.location.pathname === '/login')) {
    window.location.href = '/login';
  }
  console.log('onEnter', jwtToken);
};

const jwtTokenParam = (jwtToken) => {
  if (jwtToken) {
    const parsedToken = parseJwt(jwtToken);
    const currentDateUnixTime = Math.round(new Date().getTime() / 1000);
    console.log('Current Date', currentDateUnixTime);
    const tokenTimeRemaning = timeDiff(currentDateUnixTime, parsedToken.exp);
    console.log(tokenTimeRemaning);

    console.log('Found JWT Token', parsedToken);
    console.log('Current Date Time', dateTime());
    console.log('Token Expiration Time', getTokenExpirationDate(parsedToken.exp));
    return parsedToken;
  }

  console.log('jwtToken not set');

  jwtToken = '';
  return jwtToken;
};

export {
    jwtTokenParam
};
