import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'learn_courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('site_id').notNullable().references('id').inTable('sites').onDelete('CASCADE')
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('category').nullable()
      table.string('slug').notNullable()
      table.unique(['site_id', 'slug'])
      table.string('name').notNullable()
      table.string('icon').nullable()
      table.string('picture').nullable()
      table.string('video').nullable()
      table.text('description').nullable()
      table.boolean('open').notNullable().defaultTo(true)
      table.decimal('ranking', 3, 2).notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
