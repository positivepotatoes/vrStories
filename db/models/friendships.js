const db = require('../');

const Friendship = db.Model.extend({
  tableName: 'friendships',
  friend: function() {
    return this.belongsTo( 'Profile', 'profile_id_2');
  }
});

module.exports = db.model('Friendship', Friendship);
