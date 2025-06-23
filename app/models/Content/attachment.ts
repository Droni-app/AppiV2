import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
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

  @computed()
  get url() {
    return `${process.env.SPACES_URL}/${this.path}`
  }

  @beforeCreate()
  static assignUuid(attachment: ContentAttachment) {
    if (!attachment.id) {
      attachment.id = randomUUID()
    }
  }

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
