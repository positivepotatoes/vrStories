'use strict';
const express = require('express');
const router = express.Router();
const ViewController = require('../controllers').Views;

router.route('/addview')
  .post(ViewController.addView);

module.exports = router;
