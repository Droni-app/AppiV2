import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/Content/category'
import Site from '#models/site'
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '#validators/Back/Content/category_validator'
import string from '@adonisjs/core/helpers/string'

export default class CategoriesController {
  /**
   * Listar categorías paginadas del sitio
   */
  async index({ request, response, site }: HttpContext & { site: Site }) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const categories = await Category.query().where('site_id', site.id).paginate(page, limit)
    return response.ok(categories)
  }

  /**
   * Crear una nueva categoría para el sitio
   */
  async store({ request, response, site }: HttpContext & { site: Site }) {
    const data = await request.validateUsing(createCategoryValidator)
    // Validar unicidad de slug por site
    const exists = await Category.query()
      .where('site_id', site.id)
      .where('slug', string.slug(data.name).toLocaleLowerCase())
      .first()
    const slug = exists
      ? `${string.slug(data.name).toLocaleLowerCase()}-${Date.now()}`
      : string.slug(data.name).toLocaleLowerCase()
    const category = await Category.create({
      ...data,
      siteId: site.id,
      slug,
    })
    return response.created(category)
  }

  /**
   * Mostrar una categoría individual del sitio
   */
  async show({ params, response, site }: HttpContext & { site: Site }) {
    const category = await Category.query()
      .where('site_id', site.id)
      .where('id', params.id)
      .firstOrFail()
    return response.ok(category)
  }

  /**
   * Actualizar una categoría del sitio
   */
  async update({ params, request, response, site }: HttpContext & { site: Site }) {
    const category = await Category.query()
      .where('site_id', site.id)
      .where('id', params.id)
      .firstOrFail()
    const data = await request.validateUsing(updateCategoryValidator)
    category.merge(data)
    await category.save()
    return response.ok(category)
  }

  /**
   * Eliminar una categoría del sitio
   */
  async destroy({ params, response, site }: HttpContext & { site: Site }) {
    const category = await Category.query()
      .where('site_id', site.id)
      .where('id', params.id)
      .firstOrFail()
    await category.delete()
    return response.noContent()
  }
}
