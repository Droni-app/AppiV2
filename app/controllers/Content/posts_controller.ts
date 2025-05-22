import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/Content/post'

export default class PostsController {
  async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const posts = await Post.query().where('site_id', site.id).paginate(page, limit)
    return response.ok(posts)
  }

  async show({ params, response, site }: HttpContext) {
    const post = await Post.query()
      .where('site_id', site.id)
      .where('slug', params.id)
      .preload('category')
      .preload('user')
      .firstOrFail()
    return response.ok(post)
  }
}
