import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ContentCategoryController = () => import('#controllers/Content/categories_controller')
const ContentPostController = () => import('#controllers/Content/posts_controller')
const ContentAttachmentsController = () => import('#controllers/Content/attachments_controller')

// Public routes
router
  .group(() => {
    router.resource('categories', ContentCategoryController).only(['index', 'show'])
    router.resource('posts', ContentPostController).only(['index', 'show'])
  })
  .use([middleware.site()])
  .prefix('content')

// Private routes
router
  .group(() => {
    router.resource('attachments', ContentAttachmentsController).only(['index', 'store', 'destroy'])
  })
  .use([middleware.auth(), middleware.site()])
  .prefix('content')
