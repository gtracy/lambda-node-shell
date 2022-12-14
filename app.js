'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('pino-http')(config.getLogConfig());

// request logger
let logger = (req,res,next) => {
    req.log.info(req.url,'new request');
    next();
}

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(pino);
app.use(logger);

// API endpoint registration

// API backstop
app.get('*', (req,res) => {
    res.json({
        "status": -1,
        "description": 'unsupported endpoint'
    });
});

// error handler
app.use( (err, req, res, next) => {
    res.json({
        "status": -1,
        "description": err
    });
});

module.exports = app;
