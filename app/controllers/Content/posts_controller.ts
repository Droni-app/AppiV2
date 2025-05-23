import type { HttpContext } from '@adonisjs/core/http'
import ContentPost from '#models/Content/post'

export default class PostsController {
  async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const posts = await ContentPost.query()
      .where('site_id', site.id)
      .where('active', true)
      .preload('contentCategory')
      .preload('contentAttrs')
      .preload('user')
      .paginate(page, limit)
    return response.ok(posts)
  }

  async show({ params, response, site }: HttpContext) {
    const post = await ContentPost.query()
      .where('site_id', site.id)
      .where('slug', params.id)
      .where('active', true)
      .preload('contentCategory')
      .preload('user')
      .preload('contentAttrs')
      .firstOrFail()
    return response.ok(post)
  }
}
