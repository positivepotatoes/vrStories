const express = require('express');
const router = express.Router();
const Upload = require('../controllers').Upload;

router.route('/').post(Upload.save);

module.exports = router;
