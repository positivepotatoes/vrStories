
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('videos'),
    knex.schema.createTableIfNotExists('stories', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id');
      table.string('aws_link').nullable();
      table.timestamps(true, true);
      table.string('metadata').nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('videos', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id');
      table.string('aws_link').nullable();
      table.timestamps(true, true);
      table.string('metadata').nullable();
    }),
    knex.schema.dropTable('stories')
  ]);
};
