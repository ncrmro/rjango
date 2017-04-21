import Relay from 'react-relay';

export default class NewTodoMutation extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘loginUser’.
  static fragments = {
    user: () => Relay.QL`fragment on UserNode {
        id
    }`,
  };
  
  getMutation() {
    return Relay.QL`
        mutation { createUserTodo }
    `;
  }

  getVariables() {
    return {
      text: this.props.todo.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on CreateUserTodoPayload {
            todoEdge
            user{todos}
        },
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }

}


