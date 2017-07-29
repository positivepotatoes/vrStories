'use strict';
const express = require('express');
const router = express.Router();
const ViewController = require('../controllers').Views;

router.route('/addview')
  .post(ViewController.addView);

router.route('/ownstoryviews/:id')
  .get(ViewController.getOwnStoryViews);

module.exports = router;
