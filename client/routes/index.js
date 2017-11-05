import Landing from 'components/Landing/Landing'
import authRoutes from './auth'
import pollsRoutes from './polls'
import userRoutes from './users'
import NoneFound from 'components/NoneFound/NoneFound'

import { authenticatedRoute } from 'modules/auth/utils'
const routes = [
  {
    path: '/',
    component: authenticatedRoute(Landing, false)
  },
  ...authRoutes,
  ...pollsRoutes,
  ...userRoutes,
  {
    component: NoneFound
  }
]

export default routes
