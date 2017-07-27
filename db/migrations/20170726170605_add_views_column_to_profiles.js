
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.integer('views').defaultTo(0);
    }),
    knex.schema.table('stories', function (table) {
      table.integer('views').defaultTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.dropColumn('views');
    }),
    knex.schema.table('stories', function (table) {
      table.dropColumn('views');
    })
  ]);
};
