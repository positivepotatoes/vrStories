const db = require('../');
const User = require('./profiles');

const Story = db.Model.extend({
  tableName: 'stories',
  profile: function() {
    return this.belongsTo(Profile, 'profile_id');
  }
});

module.exports = db.model('Story', Story);