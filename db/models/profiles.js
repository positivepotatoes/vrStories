const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  videos: function() {
    return this.belongsToMany(Story, 'friendships');
  }
});

module.exports = db.model('Profile', Profile);
