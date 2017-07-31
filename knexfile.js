const config = require('config');

let knex = {
  'client': 'postgresql',
  'connection': process.env.PG_URI,
  'ssl': true,
  'pool': {
    'min': 1,
    'max': 2
  },
  'migrations': {
    'tableName': 'knex_migrations',
    'directory': 'db/migrations'
  },
  'seeds': {
    'directory': 'db/seeds'
  }
};

knex.connection ? module.exports = knex : module.exports = config['knex'];
