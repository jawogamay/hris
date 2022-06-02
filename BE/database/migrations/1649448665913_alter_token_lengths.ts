import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterTokenLengths extends BaseSchema {
  protected tableName = 'api_tokens';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('token', 255).alter();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
