import Relay from 'react-relay';
import TodosList from './TodosList'

export default Relay.createContainer(TodosList, {
  fragments: {
    todos: () => Relay.QL`
            fragment on TodoNodeConnection {
                edges{
                    node{
                        id
                        user{
                            email
                        }
                        text
                    }
                }
            }`
  }
});
