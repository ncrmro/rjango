// @flow
import React from 'react';
import { Textfield as MdlTextField } from 'react-mdl';
export default class Textfield extends React.Component {
  constructor(props:Object) {
    super(props);
    this.state = {
      value: props.value ? props.value : ''
    };
  }

  setFieldValue(event) {
    const value = event.target.value;
    this.setState({ value: value });
  }

  handleKeyPress = (event) => {
    const value = event.target.value;
    const action = this.props.action;
    const todo = {text: value};
    if (event.key == 'Enter') {
      action(todo);
    }
  };

  render() {
    const { label, floatingLabel } = this.props;
    return (
      <MdlTextField
        onChange={this.setFieldValue.bind(this)}
        onKeyPress={this.handleKeyPress}
        label={label}
        value={this.state.value}
        floatingLabel={floatingLabel}
        style={{width: '100%'}}
      />
    );
  }

}
