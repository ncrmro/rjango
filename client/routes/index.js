import Landing from 'components/Landing/Landing'
import authRoutes from './auth'
import pollsRoutes from './polls'
import userRoutes from './users'

const routes = [
  {
    path: '/',
    component: Landing
  },
  ...authRoutes,
  ...pollsRoutes,
  ...userRoutes
]

export default routes
