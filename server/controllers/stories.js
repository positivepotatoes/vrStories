const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO GET ALL STORIES RELATED TO USER ID ${req.params.id}`);
};

module.exports.addStory = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO ADD A STORY LINK TO ID ${req.params.id}`);
};