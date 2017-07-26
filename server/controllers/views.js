const models = require('../../db/models');

module.exports.addView = (req, res) => {
  console.log('req.body in views controller:', req.body);
  models.View.forge({ profile_id: req.body.profileId, story_id: req.body.storyId })
    .save();
  res.end();
};
