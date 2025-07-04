import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import LearnCourse from '#models/Learn/course'
import { randomUUID } from 'node:crypto'

export default class LearnCourseLesson extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

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

  @beforeCreate()
  static assignUuid(lesson: LearnCourseLesson) {
    if (!lesson.id) {
      lesson.id = randomUUID()
    }
  }

  @belongsTo(() => LearnCourse)
  declare learnCourse: BelongsTo<typeof LearnCourse>
}
