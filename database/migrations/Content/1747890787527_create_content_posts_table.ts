import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'content_posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('site_id').notNullable().references('id').inTable('sites').onDelete('CASCADE')
      table.uuid('content_category_id').nullable().references('id').inTable('content_categories').onDelete('CASCADE')
      table.string('slug').notNullable()
      table.unique(['site_id', 'slug'])
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('picture').nullable()
      table.text('content').nullable()
      table.string('format').notNullable().defaultTo('markdown')
      table.boolean('active').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
