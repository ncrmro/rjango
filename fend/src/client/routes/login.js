import ViewerQuery from './ViewerQuery';


export default {
  path: 'login',
  queries: ViewerQuery,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Login/LoginContainer').default);
    });
  }
};
