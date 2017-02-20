import ViewerQuery from '../queries/ViewerQuery';
import requireAuth from '../utils/jwt_token'

export  default {
    onEnter: requireAuth(),
    path: 'dashboard',
    queries: ViewerQuery,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../components/Dashboard/DashboardContainer').default);
        });
    }
};
