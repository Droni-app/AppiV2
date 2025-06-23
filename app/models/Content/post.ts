import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Site from '#models/site'
import ContentCategory from '#models/Content/category'
import ContentAttr from './attr.js'
import Comment from '#models/Social/comment'

export default class ContentPost extends BaseModel {
  public static table = 'content_posts'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare siteId: string

  @column()
  declare contentCategoryId: string | null

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare picture: string | null

  @column()
  declare content: string | null

  @column()
  declare format: string

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(post: ContentPost) {
    if (!post.id) {
      post.id = randomUUID()
    }
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>

  @belongsTo(() => ContentCategory)
  declare contentCategory: BelongsTo<typeof ContentCategory>

  @hasMany(() => ContentAttr)
  declare contentAttrs: HasMany<typeof ContentAttr>

  @hasMany(() => Comment, {
    foreignKey: 'commentableId',
    onQuery(query) {
      query.where('commentable_type', 'ContentPost')
    },
  })
  declare comments: HasMany<typeof Comment>
}
