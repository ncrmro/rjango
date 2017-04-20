import ViewerQuery from '../queries/ViewerQuery';


export default {
  path: 'account',
  childRoutes: [
    {
      path: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../modules/users/Login/LoginComponent').default);
        }, 'auth');
      }
    },
    {
      path: 'signup',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../modules/users/Signup/SignupComponent').default);
        }, 'auth');
      }
    },
    {
      path: 'profile',
      queries: ViewerQuery,

      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../modules/users/Profile/ProfileContainer').default);
        }, 'accounts');
      }
    }
  ]

};
