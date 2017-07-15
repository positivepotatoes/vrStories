const db = require('../');

const Friendship = db.Model.extend({
  tableName: 'friendships'
});

module.exports = db.model('Friendship', Friendship);
