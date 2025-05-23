import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class ContentCategory extends BaseModel {
  public static table = 'content_categories'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare siteId: string

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare picture: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(category: ContentCategory) {
    if (!category.id) {
      category.id = randomUUID()
    }
  }
}
