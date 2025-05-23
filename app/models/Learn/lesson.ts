import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import LearnCourse from '#models/Learn/course'

export default class LearnLesson extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare learnCourseId: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare content: string | null

  @column()
  declare video: string | null

  @column()
  declare position: number

  @column()
  declare type: string

  @column()
  declare live: string | null

  @column.date()
  declare liveDate: DateTime | null

  @column.date()
  declare limitDate: DateTime | null

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => LearnCourse, { foreignKey: 'learnCourseId' })
  declare learnCourse: any
}
