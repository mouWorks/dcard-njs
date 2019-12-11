"use strict";

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const app = express();

let version = '0005';

console.log('Hey Dcard ver:'+ version);

let message = 'Dcard Demo @port 3003 : ver' + version;

app.get('/', (req, res) => res.send(message));

let DcardRouter = require('./routes/dcard');
app.use(DcardRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.sendFile(path.join(__dirname + '/static/html/error.html'));
    // res.render('error');
});

app.listen(3003, () => console.log('Listening on 3003 port'));
