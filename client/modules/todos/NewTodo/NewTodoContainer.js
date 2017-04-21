import Relay from 'react-relay';
import NewTodo from './NewTodo';
import NewTodoMutation from './NewTodoMutation';

export default Relay.createContainer(NewTodo, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on Viewer {
            ${NewTodoMutation.getFragment('viewer')}
        }`
  }
});
  