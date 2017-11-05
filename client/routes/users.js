import Account from 'modules/account/Account'
import { authenticatedRoute } from 'modules/auth/utils'

const userRoutes = [
  {
    path: '/account',
    component: authenticatedRoute(Account)
  }
]


export default userRoutes
