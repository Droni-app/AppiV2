import type { HttpContext } from '@adonisjs/core/http'
import SocialComment from '#models/Social/comment'
import { createCommentValidator, indexCommentValidator } from '#validators/Social/comment_validator'
import { DateTime } from 'luxon'

export default class CommentsController {
  async index({ request, response, site }: HttpContext) {
    const payload = await request.validateUsing(indexCommentValidator)
    const { commentableType, commentableId, page = 1, limit = 10 } = payload
    const comments = await SocialComment.query()
      .where('commentable_type', commentableType)
      .where('commentable_id', commentableId)
      .where('site_id', site.id)
      .whereNotNull('approved_at')
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page, limit)
    return response.ok(comments)
  }

  async store({ request, response, auth, site }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createCommentValidator)

    // Validar que el objeto a comentar exista
    let exists = false
    if (payload.commentableType === 'ContentPost') {
      const ContentPostModule = await import('#models/Content/post')
      const ContentPost = ContentPostModule.default
      exists = !!(await ContentPost.query()
        .where('id', payload.commentableId)
        .where('site_id', site.id)
        .where('active', true)
        .first())
    }
    if (!exists) {
      return response.notFound({ message: 'El objeto a comentar no existe' })
    }

    // Validar si el comentario debe aprobarse automáticamente
    let approvedAt: import('luxon').DateTime | null = null
    let approvedCount = 0
    const approvedCountResult = await SocialComment.query()
      .where('user_id', user.id)
      .where('site_id', site.id)
      .whereNotNull('approved_at')
      .limit(2)
      .count('* as total')
    if (approvedCountResult.length > 0) {
      approvedCount = Number(approvedCountResult[0].$extras.total)
    }
    if (user.emailVerifiedAt || approvedCount >= 2) {
      approvedAt = DateTime.now()
    }

    const comment = await SocialComment.create({
      userId: user.id,
      siteId: site.id,
      commentableType: payload.commentableType,
      commentableId: payload.commentableId,
      content: payload.content,
      approvedAt,
    })
    return response.created(comment)
  }
}
