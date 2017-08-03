const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  stories: function() {
    return this.hasMany('Story');
  },
  recentStories: function() {
    let now = Date.now();
    let sevenDaysAgo = now - 6.048e+8;
    let date = new Date(sevenDaysAgo);
    let ISOString = date.toISOString();
    return this.hasMany('Story').query('where', 'created_at', '>', ISOString);
  },
  friends: function() {
    return this.belongsToMany('Profile', 'friendships', 'profile_id_1', 'profile_id_2' );
  }
});

module.exports = db.model('Profile', Profile);
