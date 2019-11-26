"use strict";

const express = require('express');
const router = express.Router();
const dcard = require('../modules/dcard');

//DcardDemo
router.get('/check', (req, res) => dcard.check(req, res));

//MySQL
router.get('/demo', (req, res) => dcard.demoServer(req, res));

//Redis
router.get('/r', (req, res) => dcard.demo_redis(req, res));

module.exports = router;