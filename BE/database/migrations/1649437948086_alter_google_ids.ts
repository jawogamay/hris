import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterGoogleIds extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('google_id', 255).nullable().alter();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
