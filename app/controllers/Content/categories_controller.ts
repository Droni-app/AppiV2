import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/Content/category'

export default class CategoriesController {
  async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const categories = await Category.query().where('site_id', site.id).paginate(page, limit)
    return response.ok(categories)
  }

  async show({ params, response, site }: HttpContext) {
    const category = await Category.query()
      .where('site_id', site.id)
      .where('id', params.id)
      .firstOrFail()
    return response.ok(category)
  }
}
