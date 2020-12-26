# Product sales dashboard application in Nodejs and React

This responsive app display data about new customers who buy products in realtime via REST.

There are 3 endpoints:

```
GET http://localhost:9000/products
```
> Get all available products

```
GET http://localhost:9000/products/{product-id}
```
> Returns a JSON representation of the product and its customers. It can take the `offset` and `limit` query params

> Returns a JSON representation of the product and its customers. It can take the `offset` and `limit` query params:

```
GET http://localhost:9000/customers/{search}
```
> Get all products customers whose name or quote contain the search string

App workflow:
- For each product the `/products` REST endpoint returns, render a column
- For each column, render the customers of that product.
- When the user types in the search bar then the UI will show the customers whose names or quotes match the search and highlight them
- For each product, poll the customer REST endpoint every 30 seconds and update the UI with the new customer data
