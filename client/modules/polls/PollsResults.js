import React from 'react';
import Page from 'components/Page/Page';
import { createFragmentContainer } from 'react-relay';
import withRelayContainer from './PollsContainer';
import PollChoices from './PollChoices';

let PollsResult = ({ question }) =>
  <Page heading='Polls Results'>
    {question.questionText}
    <PollChoices choiceSet={question.choiceSet} />
  </Page>;

PollsResult = createFragmentContainer(PollsResult, {
  question: graphql`
      fragment PollsResults_question on Question {
          id
          questionText
          choiceSet(first:10){
              ...PollChoices_choiceSet
          }
      }
  `
});

export default withRelayContainer(PollsResult);
