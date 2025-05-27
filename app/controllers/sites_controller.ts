import type { HttpContext } from '@adonisjs/core/http'
import Site from '#models/site'

export default class SitesController {
  /**
   * @index
   * @responseBody 200 - <Site[]>
   * @tag Sites
   */
  async index({ response }: HttpContext) {
    const sites = await Site.all()
    return response.ok(sites)
  }
  /**
   * @show
   * @responseBody 200 - <Site>
   * @tag Sites
   */
  async show({ params, response }: HttpContext) {
    const site = await Site.findOrFail(params.id)
    return response.ok(site)
  }
}
