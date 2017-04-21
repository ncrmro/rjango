/* eslint-disable global-require */
import React from 'react';
import {
  List,
  ListItem,
  ListItemAction,
  ListItemContent,
  Checkbox,
  Radio
} from 'react-mdl';
import Todo from '../Todo/Todo';

const TodosList = (props) =>
  <List style={{width: '600px'}}>
    {props.todos.edges.map(({ node }) => <Todo key={node.id} todo={node} />)}
  </List>;

export default TodosList;
