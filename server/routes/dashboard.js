'use strict';
const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers').Dashboard;

router.route('/mostactiveuser')
  .get(DashboardController.getMostActiveUser);

router.route('/mostpopstoryuser')
  .get(DashboardController.getPopStoryUser);

module.exports = router;
