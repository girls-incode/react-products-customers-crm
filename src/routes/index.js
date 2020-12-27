const express = require('express');
const router = express.Router();
const productRouter = require('./product');
const customerRouter = require('./customer');

router.use('/products', productRouter);
router.use('/customers', customerRouter);

if (process.env.NODE_ENV === 'production') {
    router.get(/.*/, express.static('app/build'));
}

if (process.env.NODE_ENV === 'development') {
    router.get(/.*/, express.static('app/public'));
}

module.exports = router;
