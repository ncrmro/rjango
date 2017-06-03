/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Relay from 'react-relay';
import Textfield from 'react-mdc-web/lib/Textfield/Textfield';
import Button from 'react-mdc-web/lib/Button';
import Checkbox from 'react-mdc-web/lib/Checkbox';
import Page from 'components/Page/Page';
// import LoginUserMutation from './mutations/Login';
import RequireNoAuth from './RequireNoAuth/RequireNoAuth';
import styles from './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  handleEmailChange(e) {
    const value = e.target.value;

    this.setState({ email: value });
    const isEmailValid = this.validateEmail(value);
    // Empty value or email is not valid set error
    if (value === '' || !isEmailValid) {
      this.setState({ isEmailValid: false });
    } else {
      this.setState({ isEmailValid: true });
      this.setState({ errorEmail: false });
    }
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({ password: value });
    if (value === '') {
      this.setState({ isPasswordPresent: false });
    } else {
      this.setState({ isPasswordPresent: true });
      this.setState({ errorPassword: false });
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return re.test(email);
  }

  loginUser = (form) => {
    form.preventDefault();
    const { email, password, isEmailValid, isPasswordPresent } = this.state;
    if (isEmailValid && isPasswordPresent) {
      const loginUserMutation = new LoginUserMutation({
        email,
        password
      });


      const onSuccess = (response) => {
        const jwtToken = response.loginUser.authFormPayload.tokens.token;
        localStorage.setItem('jwtToken', jwtToken);
        this.props.router.push('/dashboard');
        window.location.reload();
      };

      Relay.Store.commitUpdate(loginUserMutation, { onSuccess }
      );
    } else {
      this.setFormErrors();
    }
  };

  render() {
    return (
      <Page
        heading='Login'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <form onSubmit={this.loginUser} className={styles.form} >

          <div className={styles.formContainer} >
            <Textfield
              className={styles.textFields}
              onChange={this.handleEmailChange.bind(this)}
              floatingLabel='Email'
              // error={this.state.errorEmail}

            />
            <br />

            <Textfield
              className={styles.textFields}
              onChange={this.handlePasswordChange.bind(this)}
              floatingLabel='Password'
              type='password'
              // error={this.state.errorPassword}
            />

            <div style={{ textAlign: 'right' }} >
              <Checkbox
                label='Remember me'
                style={{ textAlign: 'right' }}
              />
              <a href='#' >Forgot password</a>
              <Button
                primary
                className='button_submit-login-form'
              >Login</Button>
            </div>
          </div>
        </form>
      </Page>
    );
  }


}

export default RequireNoAuth(Login);
