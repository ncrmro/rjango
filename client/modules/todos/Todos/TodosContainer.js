import Relay from 'react-relay';
import Todos from './Todos';
import TodosList from '../TodosList/TodosListContainer';

export default Relay.createContainer(Todos, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on Viewer {
            allTodos(first:10) {
                ${TodosList.getFragment('todos')}
            }

        }`
  }
});
