import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Site from './site.js'
import User from './user.js'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siteId: string

  @column()
  declare userId: string

  @column()
  declare role: string

  @belongsTo(() => Site, {
    foreignKey: 'siteId',
  })
  declare site: any

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: any

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
