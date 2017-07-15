var AWS = require('aws-sdk');
// Create an S3 client
var s3 = new AWS.S3();

module.exports.save = (req, res) => {
  var buffers = [];
  req.on('data', function(chunk) {
    console.log('data:', chunk);
    buffers.push(chunk);
  });
  req.on('end', function() {
    var data = Buffer.concat(buffers, buffers.length);
    console.log('data:', data);
    var params = { Bucket: 'vr-stories', Key: Date.now().toString(), Body: data };
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully uploaded data to vr-stories');
        res.end();
      }
    });
  });
};
