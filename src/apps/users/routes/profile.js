import ViewerQuery from '../../../client/queries/ViewerQuery';
import requireAuth from '../../../client/utils/jwt_token'

export default {
    onEnter: requireAuth(),
    path: 'profile',
    queries: ViewerQuery,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/Profile/ProfileContainer').default);
        });
    }
};
