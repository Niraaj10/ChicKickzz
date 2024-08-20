const productCtrl = require('../controllers/productCtrl');

const routes = require('express').Router();

routes.route('/products')
.get(productCtrl.getProducts)
.post(productCtrl.createProducts)

routes.route('/products/:id')
.delete(productCtrl.deleteProducts)
.put(productCtrl.updateProducts)


module.exports = routes