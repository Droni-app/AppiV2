import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import '#start/routes/backoffice'
import '#start/routes/content'
import '#start/routes/learn'
import '#start/routes/social'

const AuthController = () => import('#controllers/Auth/auth_controller')
const SitesController = () => import('#controllers/sites_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
// Auth Module
router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'login'])
router.get('/auth/me', [AuthController, 'me']).use([middleware.auth()])
router.post('/auth/logout', [AuthController, 'logout']).use([middleware.auth()])
router.resource('sites', SitesController).only(['index', 'show'])
