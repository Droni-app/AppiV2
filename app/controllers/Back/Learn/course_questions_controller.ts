import type { HttpContext } from '@adonisjs/core/http'
import LearnCourseQuestion from '#models/Learn/course_question'
import { BackLearnQuestionValidator } from '#validators/Back/Learn/question_validator'
import LearnCourse from '#models/Learn/course'

export default class BackLearnCourseQuestionController {
  public async index({ request, response, site, params }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()

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
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const question = await LearnCourseQuestion.query()
      .where('id', params.id)
      .where('course_id', course.id)
      .firstOrFail()

    return response.ok(question)
  }

  public async store({ request, response, site, params, auth }: HttpContext) {
    const data = await request.validateUsing(BackLearnQuestionValidator)
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()

    const question = await LearnCourseQuestion.create({
      ...data,
      courseId: course.id,
      userId: auth.user!.id,
      wons: 0,
      loses: 0,
    })
    return response.created(question)
  }

  public async update({ params, request, response, site }: HttpContext) {
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const question = await LearnCourseQuestion.query()
      .where('id', params.id)
      .where('course_id', course.id)
      .firstOrFail()
    const data = await request.validateUsing(BackLearnQuestionValidator)
    question.merge(data)
    await question.save()
    return response.ok(question)
  }

  public async destroy({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const question = await LearnCourseQuestion.query()
      .where('id', params.id)
      .where('course_id', course.id)
      .firstOrFail()
    await question.delete()
    return response.noContent()
  }
}
