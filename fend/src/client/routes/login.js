export default {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Login/LoginComponent').default);
    });
  }
};
