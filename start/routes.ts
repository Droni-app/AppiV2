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
const ContentCategoryController = () => import('#controllers/Content/categories_controller')
const ContentPostController = () => import('#controllers/Content/posts_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

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
router.resource('/sites', SitesController).only(['index', 'show'])

// Content Module
router
  .group(() => {
    router.resource('/categories', ContentCategoryController).only(['index', 'show'])
    router.resource('/posts', ContentPostController).only(['index', 'show'])
  })
  .prefix('/content')
  .as('content')
  .use([middleware.site()])

// Back
const BackContentCategoryController = () =>
  import('#controllers/Back/Content/categories_controller')
const BackContentPostController = () => import('#controllers/Back/Content/posts_controller')
// Content Module
router
  .group(() => {
    router.resource('/categories', BackContentCategoryController).apiOnly()
    router.resource('/posts', BackContentPostController).apiOnly()
  })
  .prefix('/back/content')
  .as('back.content')
  .use([middleware.auth(), middleware.admin_site()])
