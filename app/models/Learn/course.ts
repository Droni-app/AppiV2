import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Site from '#models/site'
import User from '#models/user'

export default class Course extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(course: Course) {
    if (!course.id) {
      course.id = randomUUID()
    }
  }

  @belongsTo(() => Site, { foreignKey: 'siteId' })
  declare site: any

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any
}
