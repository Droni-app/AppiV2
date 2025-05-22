import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Site from '#models/site'
import Category from '#models/Content/category'
import Attr from './attr.js'

export default class Post extends BaseModel {
  public static table = 'content_posts'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare siteId: string

  @column()
  declare categoryId: string | null

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
  static assignUuid(post: Post) {
    if (!post.id) {
      post.id = randomUUID()
    }
  }

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: any

  @belongsTo(() => Site, { foreignKey: 'siteId' })
  declare site: any

  @belongsTo(() => Category, { foreignKey: 'categoryId' })
  declare category: any

  @hasMany(() => Attr, { foreignKey: 'postId' })
  declare attrs: any
}
