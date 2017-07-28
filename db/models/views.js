const db = require('../');
const Profile = require('./profiles.js');

const View = db.Model.extend({
  tableName: 'views',
  profile: function() {
    return this.belongsTo(Profile, 'profile_id');
  },
  story: function() {
    return this.belongsTo(Story, 'story_id');
  }
});

module.exports = db.model('View', View);
