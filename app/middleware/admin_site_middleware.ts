import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Enrollment from '#models/enrollment'

export default class SiteMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const { key, secret } = ctx.request.headers()
    // validate exists key and secret
    const user = ctx.auth.user
    if (!key || !secret || !user) {
      throw new Error('Key, secret and user are required')
    }
    const enrollment = await Enrollment.query().where('site_id', key).where('user_id', user.id).where('role', 'admin').preload('site').first()
    if (!enrollment) {
      throw new Error('You are not authorized to access this site')
    }
    ctx.site = enrollment.site

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
