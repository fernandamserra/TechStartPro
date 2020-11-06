const express = require('express');

const { route } = require('./app');

const CategoriesController = require('./controllers/CategoryController');

const ProductController = require('./controllers/ProductController')

const routes = express.Router();

routes.get('/', (req, resp)=>{
    return resp.json({nome:'algumacoisa'});
})

routes.get('/categories', CategoriesController.index)

routes.post('/product', ProductController.create)

routes.get('/product', ProductController.index)

routes.get('/product/:id', ProductController.delete)

module.exports = routes;