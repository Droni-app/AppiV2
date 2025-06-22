import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'learn_course_lessons_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('lesson_id').notNullable().references('id').inTable('learn_course_lessons').onDelete('CASCADE')
      table.text('answer').nullable()
      table.string('attachments').nullable()
      table.string('status').defaultTo('pending')
      table.text('feedback').nullable()
      table.integer('qualification').defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
