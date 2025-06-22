import type { HttpContext } from '@adonisjs/core/http'
import ContentPost from '#models/Content/post'
import { createPostValidator, updatePostValidator } from '#validators/Back/Content/post_validator'
import string from '@adonisjs/core/helpers/string'

export default class PostsController {
  async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const q = request.input('q', '')
    const posts = await ContentPost.query()
      .where('site_id', site.id)
      .preload('user')
      .preload('contentCategory')
      .if(q, (query) => {
        query.where('name', 'LIKE', `%${q}%`).orWhere('description', 'LIKE', `%${q}%`)
      })
      .paginate(page, limit)
    return response.ok(posts)
  }

  async show({ params, response, site }: HttpContext) {
    const post = await ContentPost.query()
      .where('site_id', site.id)
      .where('id', params.id)
      .preload('user')
      .preload('contentCategory')
      .preload('contentAttrs')
      .firstOrFail()
    return response.ok(post)
  }

  async store({ request, response, auth, site }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    // Generate slug from name using AdonisJS string.slug helper
    const baseSlug = string.slug(payload.name).toLocaleLowerCase()
    let slug = baseSlug
    let exists = await ContentPost.query().where('site_id', site.id).where('slug', slug).first()
    let i = 2
    while (exists) {
      slug = `${baseSlug}-${i}`
      exists = await ContentPost.query().where('site_id', site.id).where('slug', slug).first()
      i++
    }
    const post = await ContentPost.create({
      ...payload,
      slug,
      userId: auth.user!.id,
      siteId: site.id,
    })
    return response.created(post)
  }

  async update({ params, request, response, site }: HttpContext) {
    const post = await ContentPost.query().where('site_id', site.id).where('id', params.id).firstOrFail()
    const payload = await request.validateUsing(updatePostValidator)
    // Do not update slug on update
    post.merge(payload)
    await post.save()
    return response.ok(post)
  }

  async destroy({ params, response, site }: HttpContext) {
    const post = await ContentPost.query().where('site_id', site.id).where('id', params.id).firstOrFail()
    await post.delete()
    return response.noContent()
  }
}
