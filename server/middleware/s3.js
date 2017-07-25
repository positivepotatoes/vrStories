const AWS = require('aws-sdk');
const AWSconfig = require('config')['AWS'];
const models = require('../../db/models');

AWS.config.update({
  accessKeyId: AWSconfig.s3.accessKeyId,
  secretAccessKey: AWSconfig.s3.secretAccessKey
});

module.exports.s3 = new AWS.S3();
