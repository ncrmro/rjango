import ViewerQuery from './ViewerQuery';

export  default {
  path: 'dashboard',
  queries: ViewerQuery,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Dashboard/DashboardContainer').default);
    });
  }
};
