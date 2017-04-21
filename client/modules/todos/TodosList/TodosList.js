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
import Textfield from '../../../components/Textfield/Textfield';

const TodosList = (props) =>
  <List>
    <ListItem>
      <Textfield
        label="Add Todo"
        floatingLabel
      />
    </ListItem>
    {props.todos.edges.map(({ node }) => <Todo key={node.id} todo={node} />)}
  </List>;

export default TodosList;
