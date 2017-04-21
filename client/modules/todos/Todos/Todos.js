/* eslint-disable global-require */
import React from 'react';
import Page from '../../../components/Page/PageComponent';
import TodosList from '../TodosList/TodosListContainer'

const Todos = (props) =>
  <Page heading='Todos' >
    <div>
      <br />
      <p>This is the dashboard</p>
      <TodosList todos={props.viewer.allTodos}/>
    </div>
  </Page>;


export default Todos;
