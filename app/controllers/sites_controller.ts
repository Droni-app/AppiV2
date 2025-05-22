import type { HttpContext } from '@adonisjs/core/http'
import Site from '#models/site'

export default class SitesController {
  async index({ response }: HttpContext) {
    const sites = await Site.all()
    return response.ok(sites)
  }

  async show({ params, response }: HttpContext) {
    const site = await Site.findOrFail(params.id)
    return response.ok(site)
  }
}
