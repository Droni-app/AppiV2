import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.timestamp('email_verified_at').nullable()
      table.string('password').notNullable()
      table.string('provider').nullable()
      table.string('provider_id').nullable()
      table.string('avatar').nullable()
      table.string('remember_me_token').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
