import React from 'react'
import { createFragmentContainer } from 'react-relay'
import { View ,Text, Button} from 'react-native'
import {Link, Route} from '../utils/Router'


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
    return <Button  >Vote</Button>
  }
}

let Question = (props: QuestionPropsType) =>
  <View >
    <Text>{props.question.questionText}</Text>
    <Text>{props.question.voteCount}</Text>
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