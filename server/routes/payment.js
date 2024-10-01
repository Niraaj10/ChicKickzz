const payCtrl = require('../controllers/paymentCtrl');

const routes = require('express').Router();

routes.get('/payment',payCtrl.getPay)


module.exports = routes