const config = require('config');

let knex = {
  "connection": process.env.PG_URI,
  "migrations": {
    "tableName": "knex_migrations",
    "directory": "db/migrations"
  },
  "seeds": {
    "directory": "db/seeds"
  }
};

knex.connection ? module.exports = knex :  module.exports = config['knex'];
