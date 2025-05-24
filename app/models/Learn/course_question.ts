import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
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
  declare difficulty: number

  @column()
  declare rank: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(question: LearnCourseQuestion) {
    if (!question.id) {
      question.id = randomUUID()
    }
  }

  @beforeSave()
  static async updateDifficulty(question: LearnCourseQuestion) {
    if (question.$dirty.wons || question.$dirty.loses) {
      const total = question.wons + question.loses
      question.difficulty = total ? Math.round((question.wons / total) * 100) / 100 : 0
    }
  }

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any

  @belongsTo(() => LearnCourse, { foreignKey: 'courseId' })
  declare course: any
}
