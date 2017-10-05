import React from 'react';
import Bundle from '../utils/bundleLoader'
//import QuestionBrowser from 'modules/polls/QuestionBrowser';
import QuestionPage from 'modules/polls/QuestionPage/QuestionPage';
import QuestionResults from 'modules/polls/QuestionPage/QuestionResults';
import PollsVote from 'modules/polls/VoteForm/VoteForm';


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
    path: '/polls/:id/detail',
    component: QuestionPage,
  },
  {
    path: '/polls/:id/results',
    component: QuestionResults,
  },
  {
    path: '/polls/:id/vote',
    component: PollsVote,
  }
];

export default pollRoutes;
