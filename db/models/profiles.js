const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  videos: function() {
    return this.hasMany('BLAH');
  }
});

module.exports = db.model('Profile', Profile);
