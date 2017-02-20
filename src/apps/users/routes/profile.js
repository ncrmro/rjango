import ViewerQuery from '../../../client/queries/ViewerQuery';


export default {
    path: 'profile',
    queries: ViewerQuery,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../components/Profile/ProfileContainer').default);
        });
    }
};
