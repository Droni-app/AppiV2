import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Site from '#models/site'

export default class SocialComment extends BaseModel {
  public static table = 'social_comments'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare siteId: string

  @column()
  declare commentableType: string

  @column()
  declare commentableId: string

  @column()
  declare content: string

  @column.dateTime()
  declare approvedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(comment: SocialComment) {
    if (!comment.id) {
      comment.id = randomUUID()
    }
  }

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any

  @belongsTo(() => Site, { foreignKey: 'siteId' })
  declare site: any
}
