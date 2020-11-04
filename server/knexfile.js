require('dotenv').config();

module.exports = {
  development: {
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
};
