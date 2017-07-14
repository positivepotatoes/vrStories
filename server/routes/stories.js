'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Stories;

router.route('/:id')
  .get(ProfileController.getAll);

router.route('/:id/addstory')
  .get(ProfileController.addStory)
;

module.exports = router;