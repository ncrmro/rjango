/* eslint-disable global-require */
import React from 'react';
import Page from '../../../components/Page/PageComponent';
import TodosList from '../TodosList/TodosListContainer'
import NewTodo from '../NewTodo/NewTodoContainer';

const Todos = (props) =>
  <Page heading='Todos' >
    <div>
      <br />
      <p>This is the dashboard</p>
      <NewTodo viewer={props.viewer}/>
      <TodosList todos={props.viewer.allTodos} />
    </div>
  </Page>;


export default Todos;
