require('dotenv').config();

module.exports = {
  development: {
    debug: true,
    client: 'pg',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      // TODO: update postgres container to create test db on start.
      database: process.env.TEST_DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
