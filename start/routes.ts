/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const AuthController = () => import('#controllers/Auth/auth_controller')
const SitesController = () => import('#controllers/sites_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'login'])
router.get('/auth/me', [AuthController, 'me']).use([middleware.auth()])
router.post('/auth/logout', [AuthController, 'logout']).use([middleware.auth()])
router.resource('/sites', SitesController).only(['index', 'show'])
