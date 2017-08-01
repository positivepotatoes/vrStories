const models = require('../../db/models');
const s3 = require('../middleware/s3.js').s3;

module.exports.getStoryByKey = (req, res) => {
  let params = { Bucket: 'vrstories', Key: req.params.id };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data.Body);
    }
  });
};
