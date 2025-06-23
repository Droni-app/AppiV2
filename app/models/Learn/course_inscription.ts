import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import LearnCourse from '#models/Learn/course'
import User from '#models/user'

export default class LearnCourseInscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare learnCourseId: string

  @column()
  declare userId: string

  @column()
  declare points: number

  @column()
  declare active: boolean

  @column()
  declare completed: boolean

  @column()
  declare certificate: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(inscription: LearnCourseInscription) {
    if (!inscription.id) {
      inscription.id = randomUUID()
    }
  }

  @belongsTo(() => LearnCourse)
  declare learnCourse: BelongsTo<typeof LearnCourse>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
