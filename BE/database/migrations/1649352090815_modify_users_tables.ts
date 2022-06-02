import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ModifyUsersTables extends BaseSchema {
  protected tableName = 'modify_users_tables';

  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('username').after('email');
    });
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('username');
    });
  }
}
