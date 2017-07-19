const AWS = require('aws-sdk');
const AWSconfig = require('config')['AWS'];
const models = require('../../db/models');

AWS.config.update({
  accessKeyId: AWSconfig.s3.accessKeyId,
  secretAccessKey: AWSconfig.s3.secretAccessKey
});

let s3 = new AWS.S3();

module.exports.save = (req, res) => {
  var key = Date.now().toString();
  var userId = req.body.userId;
  var awsLink = 'https://s3-us-west-1.amazonaws.com/vrstories/' + key;

  // send aws link & userId to db
  models.Story.forge({ profile_id: userId, aws_link: awsLink, metadata: req.files[0].mimetype })
    .save();

  let params = { Bucket: 'vrstories', Key: key, Body: req.files[0].buffer, ContentType: req.files[0].mimetype };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to vrstories bucket');
      res.end();
    }
  });
};
