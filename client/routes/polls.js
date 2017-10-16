import React from 'react';
import Bundle from '../utils/bundleLoader'
//import QuestionBrowser from 'modules/polls/QuestionBrowser';
import QuestionResultsPage from 'modules/polls/QuestionResults/QuestionResultsPage';
import VotePage from 'modules/polls/VoteForm/VotePage';


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
    component: QuestionBrowser,
  },
  {
    path: '/polls/:id/results',
    component: QuestionResultsPage,
  },
  {
    path: '/polls/:id/vote',
    component: VotePage,
  }
];

export default pollRoutes;
