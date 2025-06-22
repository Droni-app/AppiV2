import type { HttpContext } from '@adonisjs/core/http'
import LearnCourse from '#models/Learn/course'
import LearnCourseLesson from '#models/Learn/course_lesson'

export default class LearnCourseLessonAnswersController {
  /**
   * Display a list of resource
   */
  async index({request, response, site, params}: HttpContext) {
    // const course = await LearnCourse.query()
    //       .where('site_id', site.id)
    //       .where('slug', params.learn_course_id)
    //       .firstOrFail()

    // const lesson = LearnCourseLesson.query()
    //       .where('slug', params.learn_course_lesson_id)
    //       .where('learn_course_id', course.id)
    //       .where('active', true)
    //       .preload('learnCourse')
    //       .firstOrFail()

    return { params }
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
