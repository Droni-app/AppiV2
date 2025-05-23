import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'learn_lessons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('learn_course_id')
        .notNullable()
        .references('id')
        .inTable('learn_courses')
        .onDelete('CASCADE')
      table.integer('position').notNullable().defaultTo(0)
      table.string('type').notNullable().defaultTo('document')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.unique(['learn_course_id', 'slug'])
      table.string('video').nullable()
      table.string('live').nullable()
      table.date('live_date').nullable()
      table.text('description').nullable()
      table.text('content', 'longtext').nullable()
      table.date('limit_date').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
