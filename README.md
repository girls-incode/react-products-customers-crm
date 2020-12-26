## Product sales dashboard application in Nodejs and React

This responsive app display data about new customers who buy products in realtime via REST.

<kbd><img src="https://github.com/girls-incode/react-products-customers-crm/blob/master/react-products-customers-crm-dashboard.jpg" alt="" /></kbd>

There are 3 endpoints:

```
GET http://localhost:9000/products
```
> Get all available products

```
GET http://localhost:9000/products/{product-id}
```
> Get the product and its customers. It can take the `offset` and `limit` query params

```
GET http://localhost:9000/customers/{search}
```
> Get all products customers whose name or quote contain the search string

### Features
- [x] For each product returned from  `/products` REST endpoint, render a column
- [x] For each column, render the customers of that product
- [x] When the user types in the search bar then the UI will show the customers whose names or quotes match the search and highlight them
- [x] For each product, poll the customer REST endpoint every 30 seconds and update the UI with the new customer data
- [x] Responsive UI

### Tech Stack
- [x] express
- [x] socket.io
- [x] dotenv
- [x] react
- [x] react-router-dom
- [x] socket.io-client
- [x] node-sass
- [x] bootstrap-sass
- [x] html-react-parser

### Execute

```
"client:dev": "cd app && npm start",
"client:prod": "cd app && npm run build && serve -s build",
"server:dev": "NODE_ENV=development nodemon -r dotenv/config index",
"server:prod": "NODE_ENV=production nodemon -r dotenv/config index",
"start:dev": "concurrently  \"npm:server:dev \"  \"npm:client:dev\" ",
"start": "concurrently  \"npm:server:prod \"  \"npm:client:prod\" ",
```
