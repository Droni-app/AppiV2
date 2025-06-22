import type { HttpContext } from '@adonisjs/core/http'
import LearnCourse from '#models/Learn/course'
import LearnCourseLesson from '#models/Learn/course_lesson'

export default class LearnCourseLessonAnswersController {
  /**
   * Display a list of resource
   */
  async index({ request, response, site, params }: HttpContext) {
    const course = await LearnCourse.query().where('site_id', site.id).where('slug', params.course_id).firstOrFail()

    const lesson = await LearnCourseLesson.query()
      .where('slug', params.lesson_id)
      .where('learn_course_id', course.id)
      .where('active', true)
      .preload('learnCourse')
      .firstOrFail()

    return { params, course, lesson }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
