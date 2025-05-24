import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'learn_course_questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table
        .uuid('course_id')
        .notNullable()
        .references('id')
        .inTable('learn_courses')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('question').nullable()
      table.string('answer_1').notNullable()
      table.string('answer_2').notNullable()
      table.string('answer_3').notNullable()
      table.string('answer_4').notNullable()
      table.string('answer_5').notNullable()
      table.tinyint('correct').notNullable().defaultTo(1)
      table.integer('wons').notNullable().defaultTo(0)
      table.integer('loses').notNullable().defaultTo(0)
      table.float('difficulty', 5, 2).notNullable().defaultTo(0)
      table.float('rank', 5, 2).notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
