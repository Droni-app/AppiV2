import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/Social/comment'
import { createCommentValidator } from '#validators/Social/comment_validator'

export default class CommentsController {
  async index({ request, response }: HttpContext) {
    const commentableType = request.input('commentableType')
    const commentableId = request.input('commentableId')
    if (!commentableType || !commentableId) {
      return response.badRequest({ message: 'commentableType and commentableId are required' })
    }
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const comments = await Comment.query()
      .where('commentable_type', commentableType)
      .where('commentable_id', commentableId)
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page, limit)
    return response.ok(comments)
  }

  async store({ request, response, auth, site }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
    const payload = await request.validateUsing(createCommentValidator)
    const comment = await Comment.create({
      userId: user.id,
      siteId: site.id,
      commentableType: payload.commentableType,
      commentableId: payload.commentableId,
      content: payload.content,
    })
    return response.created(comment)
  }
}
