const db = require('../');

const Story = db.Model.extend({
  tableName: 'stories'
});

module.exports = db.model('Story', Story);