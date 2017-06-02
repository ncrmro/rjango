import React from 'react';
import Button from 'react-mdc-web/lib/Button/Button';
import { createFragmentContainer } from 'react-relay';
import PollChoices from './PollChoices';
import styles from './Polls.scss';


class PollsVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }

  _updateState(selected) {
    this.setState({ selected })
  }

  _returnToPolls(form) {
    form.preventDefault();
    this.props.router.history.goBack()
  }

  render() {
    const { question, router } = this.props;
    const { selected } = this.state;
    return (
      <form className={styles.pollsVoteRoot} >
        <PollChoices
          choiceSet={question.choiceSet}
          action={(selected) => this._updateState(selected)}
          selected={selected}
        />
        <div className={styles.pollsVoteActions} >
          <Button onClick={(form) => this._returnToPolls(form)} >Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    )
  }
}


export default createFragmentContainer(PollsVote, {
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


