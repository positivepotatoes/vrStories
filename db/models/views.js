const db = require('../');

const View = db.Model.extend({
  tableName: 'views'
});

module.exports = db.model('View', View);
