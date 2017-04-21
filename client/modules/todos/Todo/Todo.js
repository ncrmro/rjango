import React from 'react';
import {
  List,
  ListItem,
  ListItemAction,
  ListItemContent,
  Checkbox,
  Radio
} from 'react-mdl';
import Textfield from '../../../components/Textfield/Textfield';

const Todo = ({ todo }) =>
  <ListItem
    key={todo.id} >
    <ListItemContent>
      <Textfield
        label="todo..."
        value={todo.text}
        style={{width: '200px'}}
      />
    </ListItemContent>
    <ListItemAction>
      <Checkbox />
    </ListItemAction>
  </ListItem>;

export default Todo;