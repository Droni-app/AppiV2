import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

/*
|--------------------------------------------------------------------------
| Back Module
|--------------------------------------------------------------------------
*/
const BackSiteController = () => import('#controllers/Back/sites_controller')
const BackContentCategoryController = () => import('#controllers/Back/Content/categories_controller')
const BackContentPostController = () => import('#controllers/Back/Content/posts_controller')
const BackPostContentAttrsController = () => import('#controllers/Back/Content/post_attrs_controller')
const BackContentAttachmentsController = () => import('#controllers/Back/Content/attachments_controller')
const BackSocialCommentsController = () => import('#controllers/Back/Social/comments_controller')
const BackLearnCoursesController = () => import('#controllers/Back/Learn/courses_controller')
const BackLearnCourseLessonsController = () => import('#controllers/Back/Learn/course_lessons_controller')
const BackLearnCourseQuestionsController = () => import('#controllers/Back/Learn/course_questions_controller')

router
  .group(() => {
    router.resource('back/sites', BackSiteController).apiOnly()
    router
      .group(() => {
        // Content Module
        router.resource('back/content/categories', BackContentCategoryController).apiOnly()
        router.resource('back/content/posts', BackContentPostController).apiOnly()
        router.resource('back/content/posts.attrs', BackPostContentAttrsController).only(['store', 'destroy'])
        router
          .resource('back/content/attachments', BackContentAttachmentsController)
          .apiOnly()
          .except(['show', 'update'])
        // Social Module
        router.resource('back/social/comments', BackSocialCommentsController).only(['index', 'update', 'destroy'])
        // Learn Module
        router.resource('back/learn/courses', BackLearnCoursesController).apiOnly()
        router.resource('back/learn/courses.lessons', BackLearnCourseLessonsController).apiOnly()
        router.resource('back/learn/courses.questions', BackLearnCourseQuestionsController).apiOnly()
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
})
