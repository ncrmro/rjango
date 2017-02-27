import ViewerQuery from '../../../client/queries/ViewerQuery';


export default {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Login/LoginComponent').default);
    });
  }
};
