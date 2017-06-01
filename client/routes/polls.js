import Polls from 'modules/polls/Polls';

const pollRoutes = [
  {
    path: '/polls',
    component: Polls,
  },
  {
    path: '/polls/:id/detail',
    component: Polls,
  },
  {
    path: '/polls/:id/results',
    component: Polls,
  }
  ,
  {
    path: '/polls/:id/vote',
    component: Polls,
  }
];

export default pollRoutes