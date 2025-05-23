import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Site from '#models/site'
import User from '#models/user'

export default class ContentAttachment extends BaseModel {
  public static table = 'content_attachments'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare siteId: string

  @column()
  declare userId: string

  @column()
  declare name: string

  @column()
  declare path: string

  @column()
  declare size: number

  @column()
  declare mime: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  static assignUuid(attachment: ContentAttachment) {
    if (!attachment.id) {
      attachment.id = randomUUID()
    }
  }

  @belongsTo(() => Site, { foreignKey: 'siteId' })
  declare site: any

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any
}
