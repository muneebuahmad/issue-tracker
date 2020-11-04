const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  createForeignReference,
} = require('../../src/lib/tableUtils');
/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password', 128).notNullable();
    table.string('avatar_url');
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
    createForeignReference(table, 'user', null, true); // to denote the project owner
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.category, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project', null, true);
    table.string('name', 50).notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.status, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project', null, true);
    table.string('name', 50).notNullable();
    table.integer('order').unsigned().notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.issue, (table) => {
    table.increments().notNullable();
    createForeignReference(table, 'project', null, true);
    createForeignReference(table, 'user', 'creator_user_id', null, true);
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
    createForeignReference(table, 'user', null, true);
    createForeignReference(table, 'issue', null, true);
    table.string('comment', 3000).notNullable();
    table.string('attachments', 2000);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.comment,
      tableNames.issue,
      tableNames.status,
      tableNames.category,
      tableNames.project,
      tableNames.priority,
      tableNames.user,
    ].map((tableName) => knex.schema.dropTable(tableName)),
  );
};
