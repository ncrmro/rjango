import ViewerQuery from '../queries/ViewerQuery';

export  default {
  path: 'dashboard',
  queries: ViewerQuery,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Dashboard/DashboardContainer').default);
    });
  }
};
