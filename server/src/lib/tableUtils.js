/**
 *
 * @param {*} table - the current table that needs the default columns.
 * We are adding 3 rows in this function (so that we can keep track of soft deletes):
 * created_at, updated_at, and deleted_at.
 */
function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

/**
 *
 * @param {*} table - the current table that needs the foreign key
 * @param {*} foreignTableName - the table being referenced for the foreign key
 * @param {*} columnName - the name of the column you want the foreign key to be called.
 *                         If not passed, we just use the foreign table name + _id
 * @param {*} noNulls - whether nulls should be allowed or not. Default to false, meaning nulls allowed.
 */
function createForeignReference(
  table,
  foreignTableName,
  columnName = null,
  noNulls = false,
) {
  if (noNulls) {
    table
      .integer(columnName || `${foreignTableName}_id`)
      .unsigned()
      .references('id')
      .inTable(foreignTableName)
      .onDelete('cascade')
      .notNullable();
  } else {
    table
      .integer(columnName || `${foreignTableName}_id`)
      .unsigned()
      .references('id')
      .inTable(foreignTableName)
      .onDelete('cascade');
  }
}

module.exports = { addDefaultColumns, createForeignReference };
