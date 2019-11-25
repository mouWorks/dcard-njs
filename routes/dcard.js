"use strict";

const express = require('express');
const router = express.Router();
const dcard = require('../modules/dcard');

//DcardDemo
router.get('/check', (req, res) => dcard.check(req, res));
router.get('/demo', (req, res) => dcard.demoServer(req, res));

module.exports = router;