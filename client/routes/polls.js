import Polls from 'modules/polls/Polls';
import PollsDetail from 'modules/polls/PollsDetail';

const pollRoutes = [
  {
    path: '/polls',
    component: Polls,
  },
  {
    path: '/polls/:id/detail',
    component: PollsDetail,
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