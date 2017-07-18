const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO GET ALL STORIES RELATED TO USER ID ${req.params.id}`);
  models.Story.where({ profile_id: Number(req.params.id) }).fetchAll()
    .then(stories => {
      res.status(200).send(stories.attributes.aws_link);
    });
};

module.exports.addStory = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO ADD A STORY LINK TO ID ${req.params.id}`);
};

// sends back aws_link of the latest video of the given Facebook profile_id
module.exports.getLatestStory = (req, res) => {
  models.Story.where({ profile_id: Number(req.params.id) }).fetchAll()
    .then(stories => {
      res.status(200).send(stories.last().attributes.aws_link);
    });
};
