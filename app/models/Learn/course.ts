import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Site from '#models/site'
import User from '#models/user'
import LearnCourseLesson from '#models/Learn/course_lesson'
import LearnCourseInscription from '#models/Learn/course_inscription'

export default class LearnCourse extends BaseModel {
  public static table = 'learn_courses'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare siteId: string

  @column()
  declare userId: string

  @column()
  declare category: string | null

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare icon: string | null

  @column()
  declare picture: string | null

  @column()
  declare video: string | null

  @column()
  declare description: string | null

  @column()
  declare open: boolean

  @column()
  declare rank: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(course: LearnCourse) {
    if (!course.id) {
      course.id = randomUUID()
    }
  }

  @hasMany(() => LearnCourseLesson, {
    foreignKey: 'learnCourseId',
    onQuery: (query) => query.orderBy('position', 'asc'),
  })
  declare learnLessons: HasMany<typeof LearnCourseLesson>

  @hasMany(() => LearnCourseInscription)
  declare learnInscriptions: HasMany<typeof LearnCourseInscription>

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
