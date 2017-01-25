import React from "react";
import Relay from "react-relay";
import {Grid, Cell, Textfield, Button} from "react-mdl";
import Page from "../../../../client/components/Page/PageComponent";
import SignupUserMutation from "./SignupUserMutation";


export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }


  signupUser = (form) => {
    form.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const signupUserMutation = new SignupUserMutation({
      username,
      password
    });
    var onFailure = (transaction) => {
      console.log("failure", transaction)
    };

    var onSuccess = (response) => {
      console.log("Success", response);
      const jwtToken = response.createUser.jwtToken;
      localStorage.setItem('jwtToken', jwtToken);
      this.props.router.push('/dashboard');
      window.location.reload()
    };
    Relay.Store.commitUpdate(signupUserMutation, {onSuccess, onFailure});
  };

  render() {
    return (
      <Page heading='Signup'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }} onSubmit={this.signupUser}>
              <Cell col={12}>
                <Textfield onChange={this.handleUsernameChange.bind(this)} label='Username'/>
              </Cell>
              <Cell col={12}>
                <Textfield onChange={this.handlePasswordChange.bind(this)} label='Password' type='password'/>
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <Button primary>Sign up</Button>
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
