const {products} = require('../productAutoPopulator');

exports.getProducts = (req, res) => {
    res.json(
        Object.keys(products).map(function (productId) {
            return Object.assign(
                { id: productId },
                {
                    self:
                        req.protocol +
                        '://' +
                        req.headers.host +
                        req.url +
                        '/' +
                        productId,
                },
                products[productId],
                { customers: products[productId].customers.length }
            );
        })
    );
};

exports.getProduct = (req, res) => {
    let productId = req.params.productId;
    let product = products[productId];

    if (!product) {
        return res.status(404).json({ error: 'Product doesn\'t exist.' });
    }

    let customers = product.customers;
    let offset = +req.query.offset;
    let limit = +req.query.limit;

    if (offset > 0) {
        customers = customers.slice(offset);
    }

    if (limit > 0) {
        customers = customers.slice(0, limit);
    }
    res.json(
        Object.assign({ id: productId }, product, {
            customers: customers,
        })
    );
};