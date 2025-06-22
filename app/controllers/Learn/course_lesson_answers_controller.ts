import type { HttpContext } from '@adonisjs/core/http'
import LearnCourse from '#models/Learn/course'
import LearnCourseLesson from '#models/Learn/course_lesson'
import LearnCourseLessonAnswer from '#models/Learn/course_lesson_answer'
import { createAnswerValidator } from '#validators/Learn/course_lesson_answers_validator'

export default class LearnCourseLessonAnswersController {
  /**
   * Display a list of resource
   */
  async index({ request, response, site, params }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()

    const lesson = await LearnCourseLesson.query()
      .where('slug', params.lesson_id)
      .where('learn_course_id', course.id)
      .where('active', true)
      .preload('learnCourse')
      .firstOrFail()

    const answers = await LearnCourseLessonAnswer.query()
      .if(q, (qB) => {
        qB.whereILike('answer', `%${q}%`)
      })
      .where('learn_course_lesson_id', lesson.id)
      .where('active', true)
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page, perPage)

    return response.ok(answers)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, site, params }: HttpContext) {
    const payload = await request.validateUsing(createAnswerValidator)
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()
    const lesson = await LearnCourseLesson.query()
      .where('slug', params.lesson_id)
      .where('learn_course_id', course.id)
      .where('active', true)
      .preload('learnCourse')
      .firstOrFail()

    const existAnswer = await LearnCourseLessonAnswer.query()
      .where('learn_course_lesson_id', lesson.id)
      .where('user_id', auth.user!.id)
      .first()

    if (existAnswer) {
      return response.badRequest({ message: 'This action is not allowed' })
    }

    const answer = await LearnCourseLessonAnswer.create({
      userId: auth.user!.id,
      learnCourseLessonId: lesson.id,
      ...payload,
    })
    return answer
  }

  /**
   * Show individual record
   */
  async show({ response, site, params }: HttpContext) {
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()
    const lesson = await LearnCourseLesson.query()
      .where('slug', params.lesson_id)
      .where('learn_course_id', course.id)
      .where('active', true)
      .preload('learnCourse')
      .firstOrFail()

    const answer = await LearnCourseLessonAnswer.query()
      .where('id', params.id)
      .where('learn_course_lesson_id', lesson.id)
      .preload('user')
      .preload('learnCourseLesson')
      .firstOrFail()

    return response.ok(answer)
  }
}
