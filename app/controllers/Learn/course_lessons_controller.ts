import type { HttpContext } from '@adonisjs/core/http'
import LearnLesson from '#models/Learn/course_lesson'
import LearnCourse from '#models/Learn/course'

export default class LearnCourseLessonsController {
  public async index({ request, response, site, params }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()

    const lessons = await LearnLesson.query()
      .where('learn_course_id', course.id)
      .if(q, (qB) => {
        qB.whereILike('name', `%${q}%`).orWhereILike('description', `%${q}%`)
      })
      .where('active', true)
      .orderBy('position', 'asc')
      .paginate(page, perPage)

    return response.ok(lessons)
  }

  public async show({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()
    const lesson = await LearnLesson.query()
      .where('slug', params.id)
      .where('learn_course_id', course.id)
      .where('active', true)
      .preload('learnCourse')
      .firstOrFail()
    return response.ok(lesson)
  }
}
