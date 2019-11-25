"use strict";

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const app = express();
const log = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

let message = 'Dcard Demo @port 3003';

app.get('/', (req, res) => res.send(message));