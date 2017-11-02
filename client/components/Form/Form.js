// @flow
import React from 'react'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'
import Button from 'react-mdc-web/lib/Button'
import styles from './Form.scss'
import FormMessageList from 'components/FormMessageList/FormMessageList'

type FormPropsType = {
  fields: Array<{ id: string, floatingLabel: string, required: boolean }>
}
/**
 * Should contain shared form logic, eg prevent default,
 * default and prop defined submit button and fields
 * Will auto fill out state an on form submit
 */

const TextFields = (props) => {
  if (props.fields && props.fields.text) {
    return props.fields.text.map(field =>
      <Textfield
        key={field.id}
        onChange={e => props.handleFieldChange(e)}
        value={props.input[field.id]}
        {...field}

      />
    )
  }
  else return null
}

class Form extends React.Component {
  constructor(props: FormPropsType) {
    super(props)
    const input = {}
    props.fields.text.map(
      field => input[field.id] = ''
    )
    this.state = {
      input,
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

  submitForm(form) {
    form.preventDefault()
    this.props.submitForm(this.state.input)

  }


  render() {
    return <div className={styles.root} >
      <form
        onSubmit={this.submitForm.bind(this)}
      >
        <FormMessageList messages={this.state.errors} />
        <TextFields
          {...this.props}
          input={this.state.input}
          handleFieldChange={this.handleFieldChange.bind(this)}
        />
        <br />

        <div className={styles.actions} >
          <Button
            type="submit"
            className='button_submit-signup-form'
          >
            {this.props.submitText ? this.props.submitText : 'Submit'}
          </Button>
          {this.props.formActions}
        </div>
        <br />
      </form>
    </div>
  }


}

export default Form
