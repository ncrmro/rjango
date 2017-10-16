import React from 'react'
import Page from 'components/Page/Page'
import VoteForm from './VoteForm'

const VotePage = (props) =>
  <Page
    heading="Question"
  >
    <VoteForm {...props} />

  </Page>
export default VotePage
