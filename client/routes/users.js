import Account from 'modules/user/Account/Account'
import { authenticatedRoute } from 'modules/auth/utils'

const userRoutes = [
  {
    path: '/account',
    component: authenticatedRoute(Account)
  }
]


export default userRoutes
