import React from 'react';
import Bundle from '../utils/bundleLoader'
//import Polls from 'modules/polls/Polls';
import PollsDetail from 'modules/polls/PollsDetail';
import PollsResults from 'modules/polls/PollsResults';
import PollsVote from 'modules/polls/PollsVote';


const PollsPage = props =>
  <Bundle
    load={() =>
      import(/* webpackChunkName: "polls" */ 'modules/polls/Polls')}
  >
    { Component => <Component { ...props}/> }
  </Bundle>

const pollRoutes = [
  {
    path: '/polls',
    component: PollsPage,
  },
  {
    path: '/polls/:id/detail',
    component: PollsDetail,
  },
  {
    path: '/polls/:id/results',
    component: PollsResults,
  },
  {
    path: '/polls/:id/vote',
    component: PollsVote,
  }
];

export default pollRoutes;
