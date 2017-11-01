import React from 'react'
import Textfield from 'react-mdc-web/lib/Textfield/Textfield'
import Button from 'react-mdc-web/lib/Button'
import Page from 'components/Page/Page'

class NewPoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {
        question_text: '',
        password: ''
      },
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


  render() {
    return (
      <Page
        heading='Create Poll'

      >
        <form
          onSubmit={this.submitForm}
        >
          <Textfield
            id='question_text'
            onChange={this.handleFieldChange.bind(this)}
            value={this.state.input.question_text}
            floatingLabel='Question Text'
            required
          />
          <br />


          <div style={{ textAlign: 'right' }} >

            <Button
              type="submit"
              className='button_submit-signup-form'
            >
              Sign up
            </Button>
            <br />
          </div>
        </form>
      </Page>
    )
  }


}

export default NewPoll
