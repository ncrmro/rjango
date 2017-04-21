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

const Todo = ({ todo, user }) =>
  <ListItem threeLine
    style={{height: '115px'}}
  >
    <ListItemContent
      subtitle={'By: ' + todo.user.email}
      style={{height: 'auto'}}
    >

      <Textfield
        label="todo..."
        value={todo.text}
        style={{width: '200px'}}
      />
    </ListItemContent>
    <ListItemAction
      style={{paddingTop: '50px'}}
    >
      <Checkbox />
    </ListItemAction>
  </ListItem>;

export default Todo;