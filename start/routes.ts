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
const SocialCommentsController = () => import('#controllers/Social/comments_controller')
const LearnCoursesController = () => import('#controllers/Learn/courses_controller')

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
router.resource('sites', SitesController).only(['index', 'show'])

// Public routes
router
  .group(() => {
    // Content Module
    router.resource('content/categories', ContentCategoryController).only(['index', 'show'])
    router.resource('content/posts', ContentPostController).only(['index', 'show'])
    // Social Module
    router.resource('social/comments', SocialCommentsController).only(['index'])
    // Learn Module
    router.resource('learn/courses', LearnCoursesController).only(['index', 'show'])
  })
  .use([middleware.site()])

// Private routes
router
  .group(() => {
    // Social Module
    router.resource('social/comments', SocialCommentsController).only(['store'])
  })
  .use([middleware.auth(), middleware.site()])

/*
|--------------------------------------------------------------------------
| Back Module
|--------------------------------------------------------------------------
*/
const BackContentCategoryController = () =>
  import('#controllers/Back/Content/categories_controller')
const BackContentPostController = () => import('#controllers/Back/Content/posts_controller')
const BackPostContentAttrsController = () =>
  import('#controllers/Back/Content/post_attrs_controller')
const BackSocialCommentsController = () => import('#controllers/Back/Social/comments_controller')

router
  .group(() => {
    // Content Module
    router.resource('back/content/categories', BackContentCategoryController).apiOnly()
    router.resource('back/content/posts', BackContentPostController).apiOnly()
    router
      .resource('back/content/posts.attrs', BackPostContentAttrsController)
      .only(['store', 'destroy'])
    // Social Module
    router
      .resource('back/social/comments', BackSocialCommentsController)
      .only(['index', 'update', 'destroy'])
  })
  .use([middleware.auth(), middleware.admin_site()])
