module.exports = {
  path: 'landing',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Dashboard/DashboardComponent'));
    });
  }
};
