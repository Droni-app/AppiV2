import type { HttpContext } from '@adonisjs/core/http'
import LearnCourseInscription from '#models/Learn/course_inscription'
import Course from '#models/Learn/course'

export default class LearnCourseInscriptionsController {
  /**
   * Display a list of resource
   */
  async index({ site, params, response, request }: HttpContext) {
    const { page, perPage } = request.qs()
    const course = await Course.query()
      .where('slug', params.course_id)
      .where('site_id', site.id)
      .where('open', true)
      .firstOrFail()
    const inscriptions = await LearnCourseInscription.query()
      .where('learn_course_id', course.id)
      .preload('user')
      .paginate(page, perPage)
    return response.ok(inscriptions)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ site, params, response, auth }: HttpContext) {
    const course = await Course.query()
      .where('slug', params.course_id)
      .where('site_id', site.id)
      .where('open', true)
      .firstOrFail()
    const inscription = await LearnCourseInscription.create({
      learnCourseId: course.id,
      userId: auth.user!.id,
    })
    return response.created(inscription)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const { id } = params
    const inscription = await LearnCourseInscription.query()
      .where('id', id)
      .where('userId', auth.user!.id)
      .firstOrFail()
    await inscription.delete()
    return response.ok(inscription)
  }
}
