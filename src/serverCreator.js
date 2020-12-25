'use strict';

const express = require('express');
const productAutoPopulator = require('./productAutoPopulator');

module.exports.create = function initServer() {
    const server = express();

    const products = productAutoPopulator.start(25, process.env.PRODUCTS_INTERVAL);

    server.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    return server;
};
