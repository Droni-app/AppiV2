import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Site from '#models/site'
import User from '#models/user'
import LearnLesson from '#models/Learn/lesson'

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
  declare ranking: number

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

  @hasMany(() => LearnLesson, {
    foreignKey: 'learnCourseId',
    onQuery: (query) => query.orderBy('position', 'asc'),
  })
  public learnLessons: any

  @belongsTo(() => Site, { foreignKey: 'siteId' })
  declare site: any

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any
}
