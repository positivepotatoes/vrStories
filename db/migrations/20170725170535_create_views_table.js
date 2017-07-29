
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('views', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id');
      table.integer('story_id').references('stories.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stories')
  ]);
};
