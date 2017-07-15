<<<<<<< HEAD
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

let s3 = new aws.S3();
// var credentials = new aws.SharedIniFileCredentials({profile: 'vrstories'});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vrstories'
  }),
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
  }
});

module.exports.save = (req, res) => {
  console.log(req.body);
};
=======
// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create an S3 client
var s3 = new AWS.S3();

var params = {Bucket: 'vr-stories', Key: Date.now().toString(), Body: 'Hello World!'};
s3.putObject(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully uploaded data to vr-stories');
  }
});
>>>>>>> some progress on s3
