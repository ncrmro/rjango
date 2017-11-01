import React from 'react'
import Bundle from 'utils/bundleLoader'
//import QuestionBrowser from 'modules/polls/QuestionBrowser';
import QuestionResultsPage from 'modules/polls/QuestionResults/QuestionResultsPage'
import VotePage from 'modules/polls/VoteForm/VotePage'
import NewPoll from 'modules/polls/NewPoll/NewPoll'
import { authenticatedRoute } from 'modules/auth/utils'


const QuestionBrowser = props =>
  <Bundle
    load={() =>
      import(/* webpackChunkName: "polls" */ 'modules/polls/QuestionBrowser/QuestionBrowser')}
  >
    { Component => <Component { ...props}/> }
  </Bundle>

const pollRoutes = [
  {
    path: '/polls',
    component: authenticatedRoute(QuestionBrowser)
  },
  {
    path: '/polls/:id/results',
    component: authenticatedRoute(QuestionResultsPage)
  },
  {
    path: '/polls/:id/vote',
    component: authenticatedRoute(VotePage)
  },
  {
    path: '/polls/new',
    component: authenticatedRoute(NewPoll)
  }
]

export default pollRoutes
