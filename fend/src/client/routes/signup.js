module.exports = {
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Signup/SignupComponent'));
    });
  }
};
