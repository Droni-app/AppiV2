import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Post from './post.js'
import { randomUUID } from 'node:crypto'

export default class Attr extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare postId: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column()
  declare value: string

  @beforeCreate()
  static assignUuid(attr: Attr) {
    if (!attr.id) {
      attr.id = randomUUID()
    }
  }

  // Define relationships if needed
  @belongsTo(() => Post, { foreignKey: 'postId' })
  declare post: any
}
