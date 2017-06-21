/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'
import Button from 'react-mdc-web/lib/Button'
import Checkbox from 'react-mdc-web/lib/Checkbox'
import Page from 'components/Page/Page'
import LoginUserMutation from './mutations/Login'
import SignupUserMutation from './mutations/Signup'
import { authenticatedRoute } from './utils'
import styles from './Auth.scss'

function isLoginCheck(props) {
  return props.router.match.path === '/login'
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    const initialInput = {
      email: '',
      password: '',
    }
    if (!isLoginCheck(props)) {
      initialInput.passwordConfirmation = ''
    }

    this.state = {
      input: initialInput,
      isEmailValid: false,
      isPasswordPresent: false,
      errors: []
    }
  }

  passwordMatchValidation(input) {
    return input.password === input.passwordConfirmation
  }

  handleFieldChange(e) {
    const input = this.state.input
    const inputName = e.target.id
    input[inputName] = e.target.value
    this.setState({ input })
  }

  loginUser = (environment, input) => {
    const mutation = LoginUserMutation(environment, input)
  }
  signupUser = (environment, input) => {
    const mutation = SignupUserMutation(environment, input)
  }

  submitForm = (form) => {
    form.preventDefault()
    const isLogin = isLoginCheck(this.props)
    const { input } = this.state
    const passwordsMatch = this.passwordMatchValidation(input)
    const errors = []
    let id = 0

    if (!passwordsMatch) {
      id++
      errors.push({
        id,
        key: '',
        message: 'The password confirmation field did not match the password you entered below'
      })
    }
    if (!input.email) {
      id++
      errors.push({
        id,
        key: '',
        message: 'Please fill out the email field'
      })
    }
    if (!input.password) {
      id++
      errors.push({
        id,
        key: '',
        message: 'Please fill out the password field'
      })

    }
    if (passwordsMatch && input.email && input.password) {
      const { environment } = this.props
      isLogin ? this.loginUser(environment, input) : this.signupUser(environment, {
        email: input.email,
        password: input.password
      })
    }
    this.setState({ errors })
  }

  getErrors(fieldId) {
    const { errors } = this.state
    if (errors.length > 0) {
      return errors.filter(x => x.key === fieldId)
    }
    else return []
  }

  render() {
    const { input, errors } = this.state
    const isLogin = isLoginCheck(this.props)
    console.log('error', this.getErrors(''))

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
          { errors.length ?
            <ul className="errorMessages" >
              {
                this.getErrors('').map(error =>
                  <li key={error.id} >
                    {error.message}
                  </li>
                )
              }
            </ul>
            :
            null
          }

          <div className={styles.formContainer} >
            <Textfield
              id='email'
              className={`${styles.textFields} email_input`}
              onChange={this.handleFieldChange.bind(this)}
              value={input.email}
              floatingLabel='Email'
              // error={this.state.errorEmail}

            />
            <br />

            <Textfield
              id='password'
              className={styles.textFields}
              onChange={this.handleFieldChange.bind(this)}
              value={input.password}
              floatingLabel='Password'
              type='password'
            />
            {!isLogin ?
              <Textfield
                id='passwordConfirmation'
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
              <br />
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
    )
  }


}

export default authenticatedRoute(false, Login)
