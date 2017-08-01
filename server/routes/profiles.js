'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/:id/friends')
  .get(ProfileController.getFriends);

module.exports = router;
