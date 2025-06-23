import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ContentPost from '#models/Content/post'
import { randomUUID } from 'node:crypto'

export default class ContentAttr extends BaseModel {
  public static table = 'content_attrs'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare contentPostId: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column()
  declare value: string

  @beforeCreate()
  static assignUuid(attr: ContentAttr) {
    if (!attr.id) {
      attr.id = randomUUID()
    }
  }

  // Define relationships if needed
  @belongsTo(() => ContentPost)
  declare contentPost: BelongsTo<typeof ContentPost>
}
