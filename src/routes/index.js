const express = require('express');
const router = express.Router();
const productRouter = require('./product');
const customerRouter = require('./customer');

router.use('/products', productRouter);
router.use('/customers', customerRouter);
router.get(/.*/, express.static('app'));

module.exports = router;
