import Relay from 'react-relay';
import UserTodos from './UserTodos';
import TodosList from '../TodosList/TodosListContainer';
import NewUserTodo from '../NewUserTodo/NewUserTodoContainer';

export default Relay.createContainer(UserTodos, {
  fragments: {
    user: () => Relay.QL`
        fragment on UserNode {
            todos(first:10) {
                ${TodosList.getFragment('todos')}
                
            }
            ${NewUserTodo.getFragment('user')}
        }`
  }
});
