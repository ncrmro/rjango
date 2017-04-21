import Relay from 'react-relay';

export default class NewTodoMutation extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘loginUser’.
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer {
        id
    }`,
  };
  
  getMutation() {
    return Relay.QL`
        mutation { createTodo }
    `;
  }

  getVariables() {
    return {
      text: this.props.todo.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
        fragment on CreateTodoPayload {
            todoEdge
            viewer{todos}
        },
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }


}


