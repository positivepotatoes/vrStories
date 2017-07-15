const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: '', //need location
  secretAccessKey: '', //need exact location
});

let s3 = new AWS.S3();

module.exports.save = (req, res) => {
  console.log(req.files);
  console.log(Date.now().toString());
  let params = { Bucket: 'vrstories', Key: Date.now().toString(), Body: req.files[0].buffer, ContentType: req.files[0].mimetype};
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully uploaded data to vrstories');
      res.end();
    }
  });
};
