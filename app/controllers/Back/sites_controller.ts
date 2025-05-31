import type { HttpContext } from '@adonisjs/core/http'
import Site from '#models/site'
import { storeSiteValidator, updateSiteValidator } from '#validators/Back/site_validator'
import string from '@adonisjs/core/helpers/string'

export default class SitesController {
  /**
   * Lista paginada de todos los sitios
   */
  async index({ request, response, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const availableroles = ['admin', 'editor', 'owner']

    const sites = await Site.query()
      .whereHas('enrollments', (query) => {
        query.where('user_id', auth.user?.id).whereIn('role', availableroles)
      })
      .orderBy('updated_at', 'desc')
      .preload('enrollments', (query) => {
        query.where('user_id', auth.user?.id).whereIn('role', availableroles)
      })
      .paginate(page, limit)

    return response.ok(sites)
  }

  /**
   * Muestra los detalles de un sitio específico
   */
  async show({ params, response, auth }: HttpContext) {
    const site = await Site.query()
      .where('id', params.id)
      .whereHas('enrollments', (query) => {
        query.where('user_id', auth.user?.id).whereIn('role', ['admin', 'editor', 'owner'])
      })
      .firstOrFail()
    return response.ok(site)
  }

  /**
   * Crea un nuevo sitio
   */
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(storeSiteValidator)

    // Generar un secret único para el sitio
    const secret = string.generateRandom(32)

    const site = await Site.create({
      ...payload,
      secret,
    })

    await site.related('enrollments').create({
      userId: auth.user?.id,
      role: 'owner',
    })

    return response.created(site)
  }

  /**
   * Actualiza un sitio existente
   */
  async update({ params, request, response, auth }: HttpContext) {
    const site = await Site.query()
      .where('id', params.id)
      .whereHas('enrollments', (query) => {
        query.where('user_id', auth.user?.id).whereIn('role', ['admin', 'owner'])
      })
      .firstOrFail()
    const payload = await request.validateUsing(updateSiteValidator)

    // Si se está actualizando el dominio, verificar que no exista
    if (payload.domain && payload.domain !== site.domain) {
      const existingSite = await Site.query()
        .where('domain', payload.domain)
        .where('id', '!=', site.id)
        .first()

      if (existingSite) {
        return response.conflict({
          message: 'El dominio ya está en uso por otro sitio',
        })
      }
    }

    site.merge(payload)
    await site.save()

    return response.ok(site)
  }

  /**
   * Elimina un sitio
   */
  async destroy({ params, response, auth }: HttpContext) {
    const site = await Site.query()
      .where('id', params.id)
      .whereHas('enrollments', (query) => {
        query.where('user_id', auth.user?.id).whereIn('role', ['admin', 'owner'])
      })
      .firstOrFail()
    await site.delete()

    return response.noContent()
  }
}
