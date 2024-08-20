const categoryCtrl = require('../controllers/categoryCtrl');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const routes = require('express').Router();

routes.route('/category')
.get(categoryCtrl.getCategories)
.post(auth,adminAuth,categoryCtrl.createCategory)

routes.route('/category/:id')
.delete(auth,adminAuth,categoryCtrl.deleteCategory)
.put(auth,adminAuth,categoryCtrl.updateCategory)


module.exports = routes