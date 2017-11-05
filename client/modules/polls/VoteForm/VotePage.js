import React from 'react'
import Page from 'components/Page/Page'
import withRelayContainer from 'utils/relay'
import { VoteFormFragmentContainer } from './VoteForm'

const VotePage = (props) =>
  <Page
    heading="Question"
  >
    <VoteFormFragmentContainer {...props} question={props.viewer.question} />

  </Page>

const query = graphql`
    query VotePageQuery($id: ID!) {
        viewer{
            question(id: $id) {
                ...VoteForm_question
            }
        }
    }
`
export default withRelayContainer(VotePage, query)