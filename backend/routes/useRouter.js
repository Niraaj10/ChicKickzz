const userCtrl = require('../controllers/userCtrl');

const routes = require('express').Router();

// routes.post('/signup',(req,res)=>{
//     res.json({"msg":"Testinggggg"})
// })
routes.post('/signup',userCtrl.signup)
routes.post('/login',userCtrl.login)
routes.post('/refTokenn',userCtrl.refToken)

module.exports = routes