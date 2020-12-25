const { products } = require('../productAutoPopulator');

exports.getCustomers = function (req, res) {
    let search = req.params.search;

    res.json(
        Object.values(products).filter(product => {
            let custList = product.customers.filter(customer => {
                const { name, quote } = customer;
                if (name.toLowerCase().includes(search) || quote.toLowerCase().includes(search)) {
                    return customer;
                }
            });
            if (custList.length) {
                return Object.assign(product, {
                    customers: custList,
                })
            }
        })
    )
};