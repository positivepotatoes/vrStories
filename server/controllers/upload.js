const models = require('../../db/models');
const s3 = require('../middleware/s3.js').s3;

module.exports.save = (req, res) => {
  var key = Date.now().toString();
  var userId = req.body.userId;
  if (req.files[0].mimetype === 'image/jpeg') {
    var awsLink = `http://localhost:3000/api/stories/story/${key}` || `https://vrstoriesstaging.herokuapp.com/api/stories/story/${key}` || `https://vrstories.herokuapp.com/api/stories/story/${key}` || `http://54.183.200.202//api/stories/story/${key}`;
  } else if (req.files[0].mimetype === 'video/mp4') {
    var awsLink = 'https://s3-us-west-1.amazonaws.com/vrstoriesprod/' + key;
  }
  // send aws link & userId to db
  models.Story.forge({ profile_id: userId, aws_link: awsLink, metadata: req.files[0].mimetype })
    .save();

  let params = { Bucket: 'vrstoriesprod', Key: key, Body: req.files[0].buffer, ContentType: req.files[0].mimetype };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to vrstoriesorid bucket');
      res.end();
    }
  });
};
