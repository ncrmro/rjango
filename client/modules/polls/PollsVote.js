import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import { createFragmentContainer } from 'react-relay'

import PollChoices from './PollChoices'
import styles from './Polls.scss'
import vote from './mutations/vote'

export const variables = { count: 10 }

type PollVotePropsType = {
  environment: Object,
  router: Object,
  question: Object,

}
class PollVote extends React.Component {
  constructor(props: PollVotePropsType) {
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
        <PollChoices
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

//PollsVote = authenticatedRoute(true, PollsVote);

export default createFragmentContainer(PollVote, {
  question: graphql`
      fragment PollsVote_question on Question {
          id
          questionText
          choiceSet(first:10){
              ...PollChoices_choiceSet
          }
      }
  `
});

