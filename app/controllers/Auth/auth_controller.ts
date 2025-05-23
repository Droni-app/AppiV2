import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/Auth/auth_validator'
import Site from '#models/site'
import Enrollment from '#models/enrollment'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    return response.created(user)
  }

  async login({ request }: HttpContext) {
    const { email, password, siteId } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    // crear enrollments si existe siteId
    if (siteId) {
      const site = await Site.find(siteId)
      if (site) {
        await Enrollment.firstOrCreate({
          userId: user.id,
          siteId: site.id,
          role: 'user',
        })
      }
    }
    // Generar token de acceso con el guard API
    const token = await User.accessTokens.create(user)
    return {
      user,
      token,
    }
  }

  async me({ auth }: HttpContext) {
    return {
      user: auth.user,
    }
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return {
      user: auth.user,
    }
  }
}
