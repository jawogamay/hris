import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AddResetTokenFieldToUsersTables extends BaseSchema {
  protected tableName = 'add_reset_token_field_to_users_tables';

  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('reset_token').after('remember_me_token');
    });
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('reset_token');
    });
  }
}
