import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import { createFragmentContainer } from 'react-relay'

import QuestionChoices from './QuestionChoices'
import styles from './Polls.scss'
import vote from './mutations/vote'

export const variables = { count: 10 }

type VotePropsType = {
  environment: Object,
  router: Object,
  question: Object,

}
class VoteForm extends React.Component {
  constructor(props: VotePropsType) {
    super(props)
    this.state = {
      choice: {
        id: ''
      }
    }
  }

  _updateState(selected) {
    this.setState({ choice: { id: selected } });
  }

  _returnToPolls(form) {
    form.preventDefault();
    this.props.router.history.goBack();
  }

  _submitVote(form) {
    form.preventDefault();
    const { environment, question } = this.props;
    const { choice } = this.state;
    const mutation = vote(environment, question, choice, variables);

    return mutation;
  }

  render() {
    const { question, router } = this.props;
    const { choice } = this.state;
    return (
      <form className={styles.pollsVoteRoot} >
        <QuestionChoices
          choiceSet={question.choiceSet}
          action={selected => this._updateState(selected)}
          selected={choice.id}
        />
        <div className={styles.pollsVoteActions} >
          <Button
            onClick={form => this._returnToPolls(form)}
          >
            Cancel
          </Button>
          <Button onClick={form => this._submitVote(form)} >Submit</Button>
        </div>
      </form>
    );
  }
}

// Should do some form of auth here
//PollsVote = authenticatedRoute(true, PollsVote);

export default createFragmentContainer(VoteForm, {
  question: graphql`
      fragment VoteForm_question on Question {
          choiceSet(first:10){
              ...QuestionChoices_choiceSet
          }
      }
  `
});

