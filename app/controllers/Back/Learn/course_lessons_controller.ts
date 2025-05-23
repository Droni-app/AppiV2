import type { HttpContext } from '@adonisjs/core/http'
import LearnLesson from '#models/Learn/lesson'
import { BackLearnLessonValidator } from '#validators/Back/Learn/lesson_validator'
import LearnCourse from '#models/Learn/course'

export default class BackLearnCourseLessonsController {
  public async index({ request, response, site, params }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()

    const lessons = LearnLesson.query()
      .where('learn_course_id', course.id)
      .if(q, (qB) => {
        qB.whereILike('name', `%${q}%`).orWhereILike('description', `%${q}%`)
      })
      .orderBy('position', 'asc')
      .preload('learnCourse')
      .paginate(page, perPage)

    return response.ok(lessons)
  }

  public async show({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const lesson = await LearnLesson.query()
      .where('id', params.id)
      .where('learn_course_id', course.id)
      .firstOrFail()
    return response.ok(lesson)
  }

  public async store({ request, response, site, params }: HttpContext) {
    const data = await request.validateUsing(BackLearnLessonValidator)
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const lesson = await LearnLesson.create({
      ...data,
      learnCourseId: course.id,
    })
    return response.created(lesson)
  }

  public async update({ params, request, response, site }: HttpContext) {
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const lesson = await LearnLesson.query()
      .where('id', params.id)
      .where('learn_course_id', course.id)
      .firstOrFail()
    const data = await request.validateUsing(BackLearnLessonValidator)
    lesson.merge(data)
    await lesson.save()
    return response.ok(lesson)
  }

  public async destroy({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query()
      .where('site_id', site.id)
      .where('id', params.back_learn_course_id)
      .firstOrFail()
    const lesson = await LearnLesson.query()
      .where('id', params.id)
      .where('learn_course_id', course.id)
      .firstOrFail()
    await lesson.delete()
    return response.noContent()
  }
}
