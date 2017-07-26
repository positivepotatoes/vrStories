const models = require('../../db/models');

module.exports.addView = (req, res) => {
  models.View.where({ profile_id: req.body.profileId, story_id: req.body.storyId }).fetch()
    .then(view => {
      if (view === null) {
        models.View.forge({ profile_id: req.body.profileId, story_id: req.body.storyId })
          .save();
      }
      res.end();
    });
};
