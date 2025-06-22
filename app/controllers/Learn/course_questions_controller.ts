import type { HttpContext } from '@adonisjs/core/http'
import LearnCourseQuestion from '#models/Learn/course_question'
import LearnCourse from '#models/Learn/course'

export default class LearnCourseQuestionsController {
  public async index({ request, response, site, params }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')

    // Obtener el curso por slug
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.learn_course_id).firstOrFail()

    // Obtener las preguntas para este curso
    const questions = await LearnCourseQuestion.query()
      .where('course_id', course.id)
      .if(q, (qB) => {
        qB.whereILike('name', `%${q}%`).orWhereILike('question', `%${q}%`)
      })
      .orderBy('rank', 'desc')
      .paginate(page, perPage)

    return response.ok(questions)
  }

  public async show({ params, response, site }: HttpContext) {
    // Obtener el curso por slug
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.learn_course_id).firstOrFail()

    // Obtener la pregunta específica por su ID
    const question = await LearnCourseQuestion.query().where('id', params.id).where('course_id', course.id).preload('course').firstOrFail()

    return response.ok(question)
  }
}
