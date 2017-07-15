const db = require('../');
const User = require('./profiles');

const Story = db.Model.extend({
  tableName: 'stories',
  user: function() {
    return this.belongsTo(Profile, 'profile_id');
  }
});

module.exports = db.model('Story', Story);