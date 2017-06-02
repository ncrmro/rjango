import React from 'react';
import Relay from 'react-relay';
import Textfield from 'react-mdc-web/lib/Textfield/Textfield';
import Button from 'react-mdc-web/lib/Button';
import Page from '../../../components/Page/Page';
//import SignupUserMutation from './SignupUserMutation';
import RequireNoAuth from '../RequireNoAuth/RequireNoAuth';
import styles from './Signup.scss';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      isEmailValid: false,
      isPasswordsMatching: false,
      errorEmail: false,
      errorPassword: false

    };
  }
  
  handleEmailChange(e) {
    const value = e.target.value;
    this.setState({ email: value });
    const isEmailValid = this.validateEmail(value);
    if (isEmailValid) {
      this.setState({ isEmailValid: true });
      this.setState({ errorEmail: false });
    } else {
      this.setState({ isEmailValid: false });
    }
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({ password: value });
    const { passwordConfirmation } = this.state;
    const passwordsMatch = value === passwordConfirmation;
    if (passwordsMatch && value !== '' && passwordConfirmation !== '') {
      this.setState({ isPasswordsMatching: true });
      this.setState({ errorPassword: false });
    } else {
      this.setState({ isPasswordsMatching: false });
    }
  }

  handlePasswordConfirmationChange(e) {
    const value = e.target.value;
    this.setState({ passwordConfirmation: value });
    const { password } = this.state;
    const passwordsMatch = password === value;
    if (passwordsMatch && password !== '' && value !== '') {
      this.setState({ isPasswordsMatching: true });
      this.setState({ errorPassword: false });
    } else {
      this.setState({ isPasswordsMatching: false });
    }
  }

  render() {
    const { email, password, passwordConfirmation, isEmailValid, isPasswordsMatching } = this.state;
    return (
      <Page heading='Signup'
            style={{ display: 'flex', justifyContent: 'center' }} >

        <form onSubmit={this.signupUser} className={styles.form} >
          <div className={styles.formContainer} >

            <Textfield
              onChange={this.handleEmailChange.bind(this)}
              value={email}
              className={styles.textFields}
              floatingLabel='Email'
              helptext="Check email again please."
              helptextValidation
              pattern={!isEmailValid ? true : null}

            />
            <br/>
            <Textfield
              onChange={this.handlePasswordChange.bind(this)}
              value={password}
              className={styles.textFields}
              floatingLabel='Password'
              minLength={8}
              type='password'
              helptext="Your password must be at least 8 characters"
              helptextValidation
            />
            <br/>
            <Textfield
              onChange={this.handlePasswordConfirmationChange.bind(this)}
              value={passwordConfirmation}
              className={styles.textFields}
              floatingLabel='Password Confirmation'
              type='password'
              minLength={8}
              type='password'
              helptext="Your password must be at least 8 characters"
              helptextValidation
            />
            <div style={{ textAlign: 'right' }} >
              <Button primary className='button_submit-signup-form' >Sign
                                                                     up</Button>
            </div>

          </div>
        </form>
      </Page>
    );
  }

}

export default RequireNoAuth(Signup);
