// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create an S3 client
var s3 = new AWS.S3();

var params = {Bucket: 'vr-stories', Key: 'sample-text', Body: 'Hello World!'};
s3.putObject(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully uploaded data to vr-stories');
  }
});
