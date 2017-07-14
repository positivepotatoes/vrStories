const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Upload;

router.route('/').post(() => {
  console.log('12312312312');
});

module.exports = router;