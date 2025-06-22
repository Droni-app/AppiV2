import type { HttpContext } from '@adonisjs/core/http'
import LearnCourse from '#models/Learn/course'
import { BackLearnCourseValidator } from '#validators/Back/Learn/course_validator'
import string from '@adonisjs/core/helpers/string'

export default class BackLearnCoursesController {
  public async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const category = request.input('category')
    const q = request.input('q')

    const courses = await LearnCourse.query()
      .where('site_id', site.id)
      .if(q, (qB) => {
        qB.whereILike('name', `%${q}%`).orWhereILike('description', `%${q}%`)
      })
      .if(category, (qB) => {
        qB.where('category', category)
      })
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page, perPage)
    return response.ok(courses)
  }

  public async show({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query().where('id', params.id).where('site_id', site.id).preload('user').preload('learnLessons').firstOrFail()
    return response.ok(course)
  }

  public async store({ request, response, site, auth }: HttpContext) {
    const data = await request.validateUsing(BackLearnCourseValidator)
    // Generar slug único por site igual que en categorías
    const exists = await LearnCourse.query().where('site_id', site.id).where('slug', string.slug(data.name).toLowerCase()).first()
    const slug = exists ? `${string.slug(data.name).toLowerCase()}-${Date.now()}` : string.slug(data.name).toLowerCase()
    const course = await LearnCourse.create({
      ...data,
      siteId: site.id,
      userId: data.userId ?? auth.user!.id,
      slug,
    })
    return response.created(course)
  }

  public async update({ params, request, response, site }: HttpContext) {
    const course = await LearnCourse.query().where('id', params.id).where('site_id', site.id).firstOrFail()
    const data = await request.validateUsing(BackLearnCourseValidator)
    // Ensure userId is string or undefined (not null)
    const sanitizedData = {
      ...data,
      userId: data.userId ?? undefined,
    }
    course.merge(sanitizedData)
    await course.save()
    return response.ok(course)
  }

  public async destroy({ params, response, site }: HttpContext) {
    const course = await LearnCourse.query().where('id', params.id).where('site_id', site.id).firstOrFail()
    await course.delete()
    return response.noContent()
  }
}
