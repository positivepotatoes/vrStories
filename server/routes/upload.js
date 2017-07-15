const express = require('express');
const router = express.Router();
const Upload = require('../controllers').Upload;

<<<<<<< HEAD
router.route('/').post(Upload.save);
=======
router.route('/').post((data) => {
  console.log('data in post:', data);
  console.log('12312312312');
});
>>>>>>> some progress on s3

module.exports = router;
