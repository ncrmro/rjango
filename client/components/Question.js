import React from 'react'
import Button from 'react-mdc-web/lib/Button/Button'
import VoteDialog from '../modules/polls/VoteForm/VoteDialog'
import { createFragmentContainer } from 'react-relay'
import { View ,Text} from 'react-native'


function pushRoute({ router, question: { id, hasViewerVoted } }) {
  if (hasViewerVoted) {
    router.history.push(`/polls/${id}/results`)
  }
  else {
    router.history.push(`/polls/${id}/vote`)
  }
}

const QuestionActionButton = (props) => {
  if (props.question.hasViewerVoted) {
    return <Button onClick={() => pushRoute(props)} >
      {props.question.hasViewerVoted ?
        'results' : 'vote'}
    </Button>
  }
  else if (!props.question.hasViewerVoted) {
    return <VoteDialog {...props} />
  }
}

let Question = (props: QuestionPropsType) =>
  <View >
    <Text>{props.question.questionText}</Text>
    <Text>{props.question.voteCount}</Text>
    <QuestionActionButton {...props} />
  </View>

export default Question = createFragmentContainer(Question, {
  question: graphql`
      fragment Question_question on Question {
          id
          questionText
          hasViewerVoted
          voteCount
      }
  `
})