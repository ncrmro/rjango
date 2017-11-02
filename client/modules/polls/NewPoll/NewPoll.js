import React from 'react'
import Form from 'components/Form/Form'
import Page from 'components/Page/Page'
import Button from 'react-mdc-web/lib/Button'
import NewPollMutation from './NewPollMutation'

const choiceGenerator = (choices = [], count = 2) => {
  if (choices.length === 0) {
    while (count--) {
      choices.push({
        id: `choice${count}`,
        floatingLabel: `Choice ${count}`,
        count: count,
        type: 'choice'
      })
    }
  }
  else {
    return {
      id: `choice${count}`,
      floatingLabel: `Choice ${count}`,
      count: count,
      type: 'choice'
    }
  }

  return choices
}


class NewPoll extends React.Component {
  constructor(props) {
    super(props)

    const fields = {
      text: [
        {
          id: 'question_text',
          floatingLabel: 'Question Text',
          required: true
        },
        ...choiceGenerator()
      ]
    }
    this.state = {
      fields,
      choiceCount: 2,
      errors: []
    }
  }


  submitForm(input) {
    const keys = Object.keys(input)
    const choice_keys = keys.filter(key => key.includes('choice'))
    console.log(choice_keys)
    NewPollMutation(this.props.relay.environment, input)
    console.log(input)
  }

  addChoice() {
    console.log('addChoice')
    const choices = this.state.fields.text.filter(function (field) {
      return field.type === 'choice'
    })
    const choice = choiceGenerator(choices, this.state.choiceCount + 1)

    this.setState({
      choiceCount: this.state.choiceCount + 1,
      fields: { text: [...this.state.fields.text, choice] }
    })
  }


  render() {
    return <Page
      heading='Create Poll'

    >
      <Form
        fields={this.state.fields}
        input={this.state.input}
        submitForm={this.submitForm.bind(this)}
        formActions={
          <Button
            onClick={() => this.addChoice()}
            type="button"
          >
            Add Choice
          </Button>}
      >

      </Form>
    </Page >
  }


}

export default NewPoll
