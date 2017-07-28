const models = require('../../db/models');

module.exports.addView = (req, res) => {
  models.View.where({ profile_id: req.body.profileId, story_id: req.body.storyId }).fetch()
    .then(view => {
      if (view === null) {
        models.View.forge({ profile_id: req.body.profileId, story_id: req.body.storyId })
          .save();
      }
    });

  models.Profile.where({ id: req.body.profileId })
    .fetch()
    .then(profile => {
      let currentViewCount = profile.attributes.views;
      models.Profile.where({ id: req.body.profileId })
        .save({ views: currentViewCount + 1 }, {patch: true})
        .then(() => {
          res.end();
        });
    });

  models.Story.where({ id: req.body.storyId })
    .fetch()
    .then(story => {
      let currentViewCount = story.attributes.views;
      models.Story.where({ id: req.body.storyId })
        .save({ views: currentViewCount + 1 }, {patch: true})
        .then(() => {
          res.end();
        });
    });
};

module.exports.getOwnStoryViews = (req, res) => {
  models.View.where({ story_id: req.params.id })
    .fetchAll({ withRelated: ['profile'] })
    // .fetchAll()
    .then(response => {
      // console.log('response in getOwnStoryViews:', response);
      let viewers = response.toJSON();
      console.log('JSONresponse in getOwnStoryViews:', viewers);
      let namesToSend = [];
      viewers.forEach(viewer => {
        namesToSend
      })
      res.end();
    })
}
