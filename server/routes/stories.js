'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Stories;

router.route('/:id')
  .get(ProfileController.getAll);

module.exports = router;