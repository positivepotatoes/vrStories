const models = require('../../db/models');

module.exports.getMostActiveUser = (req, res) => {
  models.Profile.forge().orderBy('views', 'DESC').fetch()
    .then(profile => {
      res.send({ first: profile.attributes.first, last: profile.attributes.last });
    });
};

module.exports.getPopStoryUser = (req, res) => {
  models.Story.forge().orderBy('views', 'DESC').fetch()
    .then(story => {
      models.Profile.where({ id: story.attributes.id }).fetch()
        .then(profile => {
          res.send({ first: profile.attributes.first, last: profile.attributes.last });
        });
    });
};
