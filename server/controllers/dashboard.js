const models = require('../../db/models');

module.exports.getMostActiveUser = (req, res) => {
  models.Profile.forge().orderBy('views', 'DESC').fetch()
    .then(profile => {
      res.send({ first: profile.attributes.first, last: profile.attributes.last });
    });
};
