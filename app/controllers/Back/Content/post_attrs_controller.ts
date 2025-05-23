import type { HttpContext } from '@adonisjs/core/http'
import Attr from '#models/Content/attr'
import ContentPost from '#models/Content/post'

export default class PostAttrsController {
  async store({ request, response, params, site }: HttpContext) {
    const post = await ContentPost.query()
      .where('site_id', site.id)
      .where('id', params.post_id)
      .firstOrFail()
    const payload = request.only(['name', 'type', 'value'])
    const attr = await Attr.create({
      ...payload,
      postId: post.id,
    })
    return response.created(attr)
  }

  async destroy({ response, params, site }: HttpContext) {
    const post = await ContentPost.query()
      .where('site_id', site.id)
      .where('id', params.post_id)
      .firstOrFail()
    const attr = await Attr.query().where('post_id', post.id).where('id', params.id).firstOrFail()
    await attr.delete()
    return response.noContent()
  }
}
