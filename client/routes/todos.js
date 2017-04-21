import ViewerQuery from '../queries/ViewerQuery';


export default {
  path: 'todos',
  queries: ViewerQuery,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../modules/todos/Todos/TodosContainer').default);
    }, 'accounts');
  }

};
