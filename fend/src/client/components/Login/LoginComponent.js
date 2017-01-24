/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import Relay from "react-relay";
import {Grid, Cell, Textfield, Button, Checkbox} from "react-mdl";
import Page from "../Page/PageComponent";
import LoginUserMutation from "./LoginUserMutation";

export default class Login extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }


  loginUser = (form) => {
    form.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const viewer = this.props.viewer;
    const loginUserMutation = new LoginUserMutation({
      viewer,
      username,
      password
    });
    var onFailure = (transaction) => {
      console.log("failure", transaction)
    };

    var onSuccess = (response) => {
      console.log("Success", response);
      const jwtToken = response.loginUser.jwtToken;
      localStorage.setItem('jwtToken', jwtToken);
      //window.location.reload()
    };

    Relay.Store.commitUpdate(loginUserMutation, {onSuccess, onFailure}
    );
  };

  render() {
    return (
      <Page heading='Login'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }} onSubmit={this.loginUser}>
              <Cell col={12}>
                <Textfield onChange={this.handleUsernameChange.bind(this)} label='Username'/>
              </Cell>
              <Cell col={12}>
                <Textfield onChange={this.handlePasswordChange.bind(this)} label='Password' type='password'/>
              </Cell>
              <Cell col={12}>
                <Checkbox label='Remember me' ripple style={{ textAlign: 'right' }}/>
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <a href='#'>Forgot password</a>
                <Button primary>Login</Button>
              </Cell>
            </form>
          </Grid>
        </div>
      </Page>
    );
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
}
