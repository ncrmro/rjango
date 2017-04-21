import Relay from 'react-relay';
import NewUserTodo from './NewUserTodo';
import NewTodoMutation from './NewUserTodoMutation';

export default Relay.createContainer(NewUserTodo, {
  fragments: {
    user: () => Relay.QL`
        fragment on UserNode {
            ${NewTodoMutation.getFragment('user')}
        }`
  }
});
