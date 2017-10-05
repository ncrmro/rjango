import React from 'react'
import { createFragmentContainer } from 'react-relay'
import Link from 'react-router-dom/es/Link'

export type QuestionType = {
  question: {
    id: string,
    questionText: string
  }
}
let Question = (props: { question: QuestionType }) =>
  <tr key={props.question.id} >
    <td>{props.question.questionText}</td>
    <td>
      <Link
        to={`/polls/${props.question.id}/detail`}
      >
        {props.question.questionText}
      </Link>
    </td>
  </tr>

export default Question = createFragmentContainer(Question, {
  question: graphql`
      fragment Question_question on Question {
          id
          questionText
      }
  `
})