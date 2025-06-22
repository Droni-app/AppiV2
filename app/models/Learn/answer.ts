import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import LearnCourseLesson from '#models/Learn/course_lesson'
import User from '#models/user'

export default class LearnAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare lessonId: string

  @column()
  declare answer: string | null

  @column()
  declare attachments: string | null

  @column()
  declare status: string

  @column()
  declare feedback: string | null

  @column()
  declare qualification: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(answer: LearnAnswer) {
    if (!answer.id) {
      answer.id = randomUUID()
    }
  }

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any

  @belongsTo(() => LearnCourseLesson, { foreignKey: 'lessonId' })
  declare learnCourseLesson: any
}
