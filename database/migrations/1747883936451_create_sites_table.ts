import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('secret').nullable()
      table.string('name').notNullable()
      table.string('domain').notNullable().unique()
      table.string('description').nullable()
      table.string('logo').nullable()
      table.string('icon').nullable()
      table.string('provider').nullable()
      table.string('provider_client_id').nullable()
      table.string('provider_client_secret').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
