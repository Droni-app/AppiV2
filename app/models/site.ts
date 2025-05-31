import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Enrollment from './enrollment.js'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ serializeAs: null })
  declare secret: string | null

  @column()
  declare name: string

  @column()
  declare domain: string

  @column()
  declare description: string | null

  @column()
  declare logo: string | null

  @column()
  declare icon: string | null

  @column()
  declare provider: string | null

  @column()
  declare providerClientId: string | null

  @column()
  declare providerClientSecret: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(site: Site) {
    if (!site.id) {
      site.id = randomUUID()
    }
  }

  @hasMany(() => Enrollment)
  declare enrollments: any
}
