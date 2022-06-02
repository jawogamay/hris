import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUsernameFieldToUserDetailsTables extends BaseSchema {
  protected tableName = 'add_username_field_to_user_details_tables'

  public async up () {
    this.schema.alterTable('user_details', (table) => {
      table.string('username').after('user_id');
    })
  }

  public async down () {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('username');
    })
  }
}
