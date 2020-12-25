'use strict';

const generateCustomer = require('./customerGenerator');
const MAX_CUSTOMERS = 50;

const generateCustomerForProducts = function (products) {
    Object.keys(products).forEach(function (productId) {
        const customers = products[productId].customers;
        customers.unshift(generateCustomer());
        if (customers.length > MAX_CUSTOMERS) {
            customers.length = MAX_CUSTOMERS;
        }
    });
};

const pregenerateCustomersForProducts = function (products, length) {
    for (let i = 0; i < length; i++) {
        generateCustomerForProducts(products);
    }
};

const scheduleCustomerGeneration = function (products, interval) {
    setInterval(function () {
        generateCustomerForProducts(products);
        console.log('scheduleCustomerGeneration', interval);
    }, interval);
};

const products = {
    jira: {
        name: 'Jira',
        customers: [],
    },
    confluence: {
        name: 'Confluence',
        customers: [],
    },
    bamboo: {
        name: 'Bamboo',
        customers: [],
    },
    bitbucket: {
        name: 'Bitbucket',
        customers: [],
    },
    fecru: {
        name: 'Fisheye & Crucible',
        customers: [],
    },
};

module.exports.start = function start(initialLength, interval) {
    initialLength = initialLength || 10;
    interval = interval || 5000;

    const thisProducts = Object.assign({}, products);
    pregenerateCustomersForProducts(thisProducts, initialLength);
    scheduleCustomerGeneration(thisProducts, interval);

    return thisProducts;
};

module.exports.products = products;
