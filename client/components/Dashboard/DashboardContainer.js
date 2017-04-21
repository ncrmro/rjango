import Relay from 'react-relay';
import Dashboard from './DashboardComponent';
import UserTodos from '../../modules/todos/UserTodos/UserTodosContainer';

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
            fragment on Viewer {
                user{
                    email
                    ${UserTodos.getFragment('user')}
                }
            }`
  }
});
