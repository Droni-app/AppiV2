import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SocialCommentsController = () => import('#controllers/Social/comments_controller')

// Public routes
router
  .group(() => {
    router.resource('comments', SocialCommentsController).only(['index'])
  })
  .use([middleware.site()])
  .prefix('social')

// Private routes
router
  .group(() => {
    router.resource('comments', SocialCommentsController).only(['store'])
  })
  .use([middleware.auth(), middleware.site()])
  .prefix('social')
