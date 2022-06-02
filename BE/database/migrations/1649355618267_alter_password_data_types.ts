import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterPasswordDataTypes extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password', 180).nullable().alter();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
