import ViewerQuery from '../queries/ViewerQuery';
import render from '../../components/LoadingSpinner/LoadingSpinner';

export default {
  path: 'dashboard',
  queries: ViewerQuery,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/Dashboard/DashboardContainer').default);
    });
  },
  render
};

