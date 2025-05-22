import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('site_id').notNullable().references('id').inTable('sites').onDelete('CASCADE')
      table.string('commentable_type').notNullable()
      table.uuid('commentable_id').notNullable()
      table.string('content').notNullable()
      table.dateTime('approved_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
