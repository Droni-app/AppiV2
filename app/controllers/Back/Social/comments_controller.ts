import type { HttpContext } from '@adonisjs/core/http'
import SocialComment from '#models/Social/comment'
import { createCommentValidator } from '#validators/Social/comment_validator'

export default class CommentsController {
  async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const commentableId = request.input('commentableId')
    const query = SocialComment.query().where('site_id', site.id)
    if (commentableId) {
      query.where('commentable_id', commentableId)
    }
    const comments = await query.orderBy('created_at', 'desc').preload('user').paginate(page, limit)
    return response.ok(comments)
  }

  async update({ params, request, response, site }: HttpContext) {
    const comment = await SocialComment.query().where('site_id', site.id).where('id', params.id).firstOrFail()
    const payload = await request.validateUsing(createCommentValidator)
    comment.merge(payload)
    await comment.save()
    return response.ok(comment)
  }

  async destroy({ params, response, site }: HttpContext) {
    const comment = await SocialComment.query().where('site_id', site.id).where('id', params.id).firstOrFail()
    await comment.delete()
    return response.noContent()
  }
}
