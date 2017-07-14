
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.string('facebook_id', 100).nullable().unique();
      table.string('img_url').nullable();
    }),
    knex.schema.createTableIfNotExists('friendships', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id_1').references('profiles.id');
      table.integer('profile_id_2').references('profiles.id');
    }),
    knex.schema.createTableIfNotExists('videos', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('profiles.id');
      table.string('aws_link').nullable();
      table.timestamps(true, true);
      table.string('metadata').nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('facebook_id');
      table.dropColumn('img_url');
    }),
    knex.schema.dropTable('friendships'),
    knex.schema.dropTable('videos')
  ]);
};
