import type { HttpContext } from '@adonisjs/core/http'
import Site from '#models/site'

export default class SitesController {
  async index({ response }: HttpContext) {
    const sites = await Site.all()
    return response.ok(sites)
  }

  async show({ params, response }: HttpContext) {
    const site = await Site.find(params.id)
    if (!site) {
      return response.notFound({ message: 'Sitio no encontrado' })
    }
    return response.ok(site)
  }
}
