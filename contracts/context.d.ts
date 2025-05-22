import type { HttpContext } from '@adonisjs/core/http'
import type { Site } from '#models/site'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    site: Site
  }
}
