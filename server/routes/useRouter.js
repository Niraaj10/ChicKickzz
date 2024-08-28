const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

const routes = require('express').Router();

// routes.post('/signup',(req,res)=>{
//     res.json({"msg":"Testinggggg"})
// })
routes.post('/signup',userCtrl.signup)
routes.post('/login',userCtrl.login)
routes.get('/logout',userCtrl.logout)
routes.post('/refTokenn',userCtrl.refToken)
routes.get('/info', auth, userCtrl.getUser)

module.exports = routes