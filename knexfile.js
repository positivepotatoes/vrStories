// const config = require('config');
//
// module.exports = config['knex'];
const secret = require('./config/secret.js');

module.exports = {
  "client": "postgresql",
  "connection": {
    "database": secret.PG_DB,
    "user": secret.PG_USER,
    "password": secret.PG_PASSWORD,
    "host": secret.PG_HOST,
    "port": 5432
  },
  "pool": {
    "min": 1,
    "max": 2
  },
  "migrations": {
    "tableName": "knex_migrations",
    "directory": "db/migrations"
  },
  "seeds": {
    "directory": "db/seeds"
  }
};
