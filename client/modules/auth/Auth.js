import React from 'react'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'
import Button from 'react-mdc-web/lib/Button'
import Checkbox from 'react-mdc-web/lib/Checkbox'
import LoginUserMutation from './mutations/Login'
import SignupUserMutation from './mutations/Signup'
import { authenticatedRoute } from './utils'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import styles from './Auth.scss'
import Page from 'components/Page/Page'

function isLoginCheck() {
  return window.location.pathname === '/login'
}

function passwordMatchValidation(input) {
  return input.password === input.passwordConfirmation
}

function validateInput(input) {
  let errors = []
  let id = 0
  const passwordsMatch = passwordMatchValidation(input)
  // So we don't delete the original state values
  input = { ...input }
  if (!passwordsMatch && !isLoginCheck()) {
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
  if (errors.length === 0) {
    // Empty array will still return true
    errors = false
    // Passwords remove mutation doesn't require password confirmation field.
    delete input.passwordConfirmation
  }
  return { input, errors }
}

class Auth extends React.Component {
  constructor(props) {
    super(props)
    const initialInput = {
      email: '',
      password: ''
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


  handleFieldChange(e) {
    const input = this.state.input
    const inputName = e.target.id
    input[inputName] = e.target.value
    this.setState({ input })
  }

  setErrors = (errors) => {
    this.setState({ errors })
  }

  submitForm = (form) => {
    form.preventDefault()
    const isLogin = isLoginCheck(this.props)
    const { input, errors } = validateInput(this.state.input)
    const { environment, router } = this.props
    if (!errors && isLogin) {
      LoginUserMutation(environment, this.setErrors.bind(this), input)
    }
    else if (!errors) {
      SignupUserMutation(environment, this.setErrors.bind(this), input)
    }
    else {
      this.setErrors(errors)
    }
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
    //const formErrors = this.getErrors('')

    return (
      <Page
        heading={isLogin ? 'Login' : ' Sign up'}

      >
        <form
          id={isLogin ? 'Login' : ' Sign up'}
          onSubmit={this.submitForm}
          className={styles.form}
        >
          <FormMessageList messages={errors} />
          <Textfield
            id='email'
            className={`${styles.textFields} email_input`}
            onChange={this.handleFieldChange.bind(this)}
            value={input.email}
            floatingLabel='Email'
            type='email'
            required
          />
          <br />

          <Textfield
            id='password'
            className={styles.textFields}
            onChange={this.handleFieldChange.bind(this)}
            value={input.password}
            floatingLabel='Password'
            type='password'
            minLength={8}
            helptext='Your password must be at least 8 characters'
            helptextValidation
            required
          />
          {!isLogin ?
            <Textfield
              id='passwordConfirmation'
              onChange={this.handleFieldChange.bind(this)}
              value={input.passwordConfirmation}
              className={styles.textFields}
              floatingLabel='Password Confirmation'
              type='password'
              required
            />
            : null}

          <div style={{ textAlign: 'right' }} >

            <a href='#' >Forgot password</a>
            {isLogin ?
              <Button
                primary
                type="submit"
                className='button_submit-login-form'
              >
                Login
              </Button>
              :
              <Button
                primary
                type="submit"
                className='button_submit-signup-form'
              >
                Sign up
              </Button>
            }
            <br />
            { isLogin ?
              <div>
                <Checkbox
                  label='Remember me'
                  style={{ textAlign: 'right' }}
                /> <label>Remember Me</label>
              </div> : null }
          </div>
        </form>
      </Page>
    )
  }


}

export default authenticatedRoute(Auth, false)
