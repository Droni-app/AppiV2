import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

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
const ContentAttachmentsController = () => import('#controllers/Content/attachments_controller')
const SocialCommentsController = () => import('#controllers/Social/comments_controller')
const LearnCoursesController = () => import('#controllers/Learn/courses_controller')
const LearnCourseLessonsController = () => import('#controllers/Learn/course_lessons_controller')
const LearnCourseQuestionsController = () =>
  import('#controllers/Learn/course_questions_controller')

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
    router.resource('learn/courses.lessons', LearnCourseLessonsController).only(['index', 'show'])
    router
      .resource('learn/courses.questions', LearnCourseQuestionsController)
      .only(['index', 'show'])
  })
  .use([middleware.site()])

// Private routes
router
  .group(() => {
    // Content Module
    router
      .resource('content/attachments', ContentAttachmentsController)
      .only(['index', 'store', 'destroy'])
    // Social Module
    router.resource('social/comments', SocialCommentsController).only(['store'])
  })
  .use([middleware.auth(), middleware.site()])

/*
|--------------------------------------------------------------------------
| Back Module
|--------------------------------------------------------------------------
*/
const BackSiteController = () => import('#controllers/Back/sites_controller')
const BackContentCategoryController = () =>
  import('#controllers/Back/Content/categories_controller')
const BackContentPostController = () => import('#controllers/Back/Content/posts_controller')
const BackPostContentAttrsController = () =>
  import('#controllers/Back/Content/post_attrs_controller')
const BackContentAttachmentsController = () =>
  import('#controllers/Back/Content/attachments_controller')
const BackSocialCommentsController = () => import('#controllers/Back/Social/comments_controller')
const BackLearnCoursesController = () => import('#controllers/Back/Learn/courses_controller')
const BackLearnCourseLessonsController = () =>
  import('#controllers/Back/Learn/course_lessons_controller')
const BackLearnCourseQuestionsController = () =>
  import('#controllers/Back/Learn/course_questions_controller')

router
  .group(() => {
    router.resource('back/sites', BackSiteController).apiOnly()
    router
      .group(() => {
        // Content Module
        router.resource('back/content/categories', BackContentCategoryController).apiOnly()
        router.resource('back/content/posts', BackContentPostController).apiOnly()
        router
          .resource('back/content/posts.attrs', BackPostContentAttrsController)
          .only(['store', 'destroy'])
        router
          .resource('back/content/attachments', BackContentAttachmentsController)
          .apiOnly()
          .except(['show', 'update'])
        // Social Module
        router
          .resource('back/social/comments', BackSocialCommentsController)
          .only(['index', 'update', 'destroy'])
        // Learn Module
        router.resource('back/learn/courses', BackLearnCoursesController).apiOnly()
        router.resource('back/learn/courses.lessons', BackLearnCourseLessonsController).apiOnly()
        router
          .resource('back/learn/courses.questions', BackLearnCourseQuestionsController)
          .apiOnly()
      })
      .use(middleware.admin_site())
  })
  .use(middleware.auth())

// Swagger documentation
// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
