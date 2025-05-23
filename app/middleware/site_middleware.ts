import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Site from '#models/site'

export default class SiteMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const { key } = ctx.request.headers()
    const site = await Site.find(key)
    if (!site) {
      throw new Error('Site not found')
    }
    ctx.site = site

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
