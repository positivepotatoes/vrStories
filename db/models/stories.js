const db = require('../');
const User = require('./profiles');

const Story = db.Model.extend({
  tableName: 'stories',
  profile: function() {
    return this.belongsTo(Profile, 'profile_id');
  },
  views: function() {
    return this.hasMany('View');
  }
});

module.exports = db.model('Story', Story);
