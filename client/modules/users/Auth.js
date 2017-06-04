/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Textfield from 'react-mdc-web/lib/Textfield/Textfield';
import Button from 'react-mdc-web/lib/Button';
import Checkbox from 'react-mdc-web/lib/Checkbox';
import Page from 'components/Page/Page';
// import LoginUserMutation from './mutations/Login';
import RequireNoAuth from './RequireNoAuth/RequireNoAuth';
import styles from './Auth.scss';

function isLoginCheck(props) {
  return props.router.match.path === "/login"
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      isEmailValid: false,
      isPasswordPresent: false,
      errorEmail: false,
      errorPassword: false
    };
  }


  setFormErrors = () => {
    const { isEmailValid, isPasswordPresent } = this.state;
    // If not valid!
    if (!isEmailValid) {
      this.setState({ errorEmail: "Email isn't valid" });
    }
    if (!isPasswordPresent) {
      this.setState({ errorPassword: 'Passwords is blank' });
    }
  };

  handleFieldChange(e) {
    const input = this.state.input;
    const inputName = e.target.id;
    const value = e.target.value;
    input[inputName] = value;
    this.setState({input});
    console.log(value);

  }

  loginUser = (email, password) => {


  };
  signupUser = (email, password) => {


  };

  submitForm = (form) => {
    form.preventDefault();
    const isLogin = isLoginCheck(this.props);
    const { input, isEmailValid, isPasswordPresent } = this.state;

    isLogin ? this.loginUser(input) : this.signupUser(input);

  };

  render() {
    const { input, passwordConfirmation, isEmailValid, isPasswordsMatching } = this.state;
    const isLogin = isLoginCheck(this.props);

    return (
      <Page
        heading={isLogin ? 'Login' : ' Sign up'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <form
          id={isLogin ? 'Login' : ' Sign up'}
          onSubmit={this.submitForm}
          className={styles.form}
        >
          <div className={styles.formContainer} >
            <Textfield
              id="email"
              className={styles.textFields}
              onChange={this.handleFieldChange.bind(this)}
              value={input.email}
              floatingLabel='Email'
              // error={this.state.errorEmail}

            />
            <br />

            <Textfield
              id="password"
              className={styles.textFields}
              onChange={this.handleFieldChange.bind(this)}
              value={input.password}
              floatingLabel='Password'
              type='password'
              // error={this.state.errorPassword}
            />
            {!isLogin ?
              <Textfield
                id="passwordConfirmation"
                onChange={this.handleFieldChange.bind(this)}
                value={input.passwordConfirmation}
                className={styles.textFields}
                floatingLabel='Password Confirmation'
                type='password'
                minLength={8}
                helptext='Your password must be at least 8 characters'
                helptextValidation
              />
              : null}

            <div style={{ textAlign: 'right' }} >

              <a href='#' >Forgot password</a>
              <Button
                primary
                className='button_submit-login-form'
              >{isLogin ? 'Login' : 'Sign up'}</Button>
              <br/>
              { isLogin ?
                <div>
                  <Checkbox
                    label='Remember me'
                    style={{ textAlign: 'right' }}
                  /> <label>Remember Me</label>
                </div> : null }
            </div>
          </div>
        </form>
      </Page>
    );
  }


}

export default RequireNoAuth(Login);
