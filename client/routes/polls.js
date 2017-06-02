import Polls from 'modules/polls/Polls';
import PollsDetail from 'modules/polls/PollsDetail';
import PollsResults from 'modules/polls/PollsResults';
import PollsVote from 'modules/polls/PollsVote';

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
    component: PollsResults,
  },
  {
    path: '/polls/:id/vote',
    component: PollsVote,
  }
];

export default pollRoutes