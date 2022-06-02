import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserDetails extends BaseSchema {
  protected tableName = 'user_details';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.boolean('mfp_help');
      table.string('weight_goal_level');
      table.integer('activity_level');
      table.string('address');
      table.string('zip_code');
      table.double('height');
      table.double('current_weight');
      table.double('goal_weight');
      table.boolean('nine_to_ten_mode');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
