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