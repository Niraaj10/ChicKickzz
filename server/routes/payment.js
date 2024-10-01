const payCtrl = require('../controllers/paymentCtrl');

const routes = require('express').Router();

routes.get('/payment', payCtrl.getPay)

routes.post('/payment/create', payCtrl.paymentCreate)


module.exports = routes