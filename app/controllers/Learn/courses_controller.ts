import type { HttpContext } from '@adonisjs/core/http'
import LearnCourse from '#models/Learn/course'

export default class LearnCoursesController {
  public async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const category = request.input('category')
    const q = request.input('q')

    const query = LearnCourse.query().where('site_id', site.id)

    if (category) {
      query.where('category', category)
    }
    if (q) {
      query.where((qB) => {
        qB.whereILike('name', `%${q}%`).orWhereILike('description', `%${q}%`)
      })
    }

    const courses = await query.paginate(page, perPage)
    return response.ok(courses)
  }

  public async show({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query().where('slug', params.id).where('site_id', site.id).preload('user').firstOrFail()
    return response.ok(course)
  }
}
