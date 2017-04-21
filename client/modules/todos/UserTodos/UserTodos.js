/* eslint-disable global-require */
import React from 'react';
import Page from '../../../components/Page/PageComponent';
import TodosList from '../TodosList/TodosListContainer'
import NewUserTodo from '../NewUserTodo/NewUserTodoContainer';

const UserTodos = (props) =>
  <Page heading='Your Todos' >
    <div>
      {console.log(props)}
      <br />
      <p>This is the dashboard</p>
      <NewUserTodo user={props.user}/>
      <TodosList todos={props.user.todos} />
    </div>
  </Page>;


export default UserTodos;
