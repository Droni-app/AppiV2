import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import LearnCourseLesson from '#models/Learn/course_lesson'
import User from '#models/user'

export default class LearnCourseLessonAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare learnCourseLessonId: string

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

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(answer: LearnCourseLessonAnswer) {
    if (!answer.id) {
      answer.id = randomUUID()
    }
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => LearnCourseLesson)
  declare learnCourseLesson: BelongsTo<typeof LearnCourseLesson>
}
