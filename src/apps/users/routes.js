import ViewerQuery from '../../client/queries/ViewerQuery';


export default {
  path: 'account',
  childRoutes: [
    {
      path: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Login/LoginComponent').default);
        }, 'auth');
      }
    },
    {
      path: 'signup',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Signup/SignupComponent').default);
        }, 'auth');
      }
    },
    {
      path: 'profile',
      queries: ViewerQuery,

      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Profile/ProfileContainer').default);
        }, 'accounts');
      }
    }
  ]

};
