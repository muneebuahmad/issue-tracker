const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

// TODO: go through all columns and add notNullable and unique as needed

/**
 *
 * @param {*} table - the current table that needs the foreign key
 * @param {*} foreignTableName - the table being referenced for the foreign key
 * @param {*} columnName - the name of the column you want the foreign key to be called.
 *                         If not passed, we just use the foreign table name + _id
 */
function createForeignReference(table, foreignTableName, columnName = null) {
  table
    .integer(columnName || `${foreignTableName}_id`)
    .unsigned()
    .references('id')
    .inTable(foreignTableName)
    .onDelete('cascade');
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('display_name').unique();
    table.string('email').notNullable().unique();
    table.string('password', 128).notNullable();
    table.string('avatar_url').notNullable();
    table.datetime('last_login');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.priority, (table) => {
    table.increments().notNullable();
    table.string('name', 35).notNullable();
  });

  await knex.schema.createTable(tableNames.project, (table) => {
    table.increments().notNullable();
    table.string('key', 50).notNullable();
    table.string('name', 50).notNullable();
    createForeignReference(table, 'user');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.category, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project');
    table.string('name', 50).notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.status, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project');
    table.string('name', 50).notNullable();
    table.integer('order').unsigned();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.issue, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project');
    createForeignReference(table, 'user', 'creator_id');
    table.string('title', 100).notNullable();
    table.string('description', 3000).notNullable();
    createForeignReference(table, 'category');
    createForeignReference(table, 'status');
    createForeignReference(table, 'priority');
    table.datetime('start_date');
    table.datetime('end_date');
    createForeignReference(table, 'user', 'assignee_id');
    table.string('attachments', 2000);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.comment, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'user');
    createForeignReference(table, 'issue');
    table.string('comment', 3000).notNullable();
    table.string('attachments', 2000);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.comment);
  await knex.schema.dropTable(tableNames.issue);
  await knex.schema.dropTable(tableNames.status);
  await knex.schema.dropTable(tableNames.category);
  await knex.schema.dropTable(tableNames.project);
  await knex.schema.dropTable(tableNames.priority);
  await knex.schema.dropTable(tableNames.user);
};
