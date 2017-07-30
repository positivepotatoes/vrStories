const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  stories: function() {
    return this.hasMany('Story');
  },
  friends: function() {
    return this.belongsToMany('Profile', 'friendships', 'profile_id_1', 'profile_id_2' );
  }
});

module.exports = db.model('Profile', Profile);
