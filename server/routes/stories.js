'use strict';
const express = require('express');
const router = express.Router();
const StoryController = require('../controllers').Stories;

router.route('/story/:id')
  .get(StoryController.getStoryByKey);

module.exports = router;
