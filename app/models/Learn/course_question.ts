import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import LearnCourse from '#models/Learn/course'

export default class LearnCourseQuestion extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare courseId: string

  @column()
  declare name: string

  @column()
  declare question: string | null

  @column()
  declare answer1: string

  @column()
  declare answer2: string

  @column()
  declare answer3: string

  @column()
  declare answer4: string

  @column()
  declare answer5: string

  @column({ serializeAs: null })
  declare correct: number

  @column()
  declare wons: number

  @column()
  declare loses: number

  @column()
  declare rank: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare difficulty: number

  @beforeCreate()
  static assignUuid(question: LearnCourseQuestion) {
    if (!question.id) {
      question.id = randomUUID()
    }
  }

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any

  @belongsTo(() => LearnCourse, { foreignKey: 'courseId' })
  declare course: any
}
