const AWS = require('aws-sdk');
const AWSconfig = require('config')['aws'];

AWS.config.update({
  accessKeyId: AWSconfig.s3.accessKeyId,
  secretAccessKey: AWSconfig.s3.secretAccessKey
});

let s3 = new AWS.S3();

module.exports.save = (req, res) => {
  let params = { Bucket: 'vrstories', Key: Date.now().toString(), Body: req.files[0].buffer, ContentType: req.files[0].mimetype};
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to vrstories bucket');
      res.end();
    }
  });
};
