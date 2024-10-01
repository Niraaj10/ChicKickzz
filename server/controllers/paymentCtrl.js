const paypal = require('paypal-rest-sdk');
require('dotenv').config();


paypal.configure({
    "mode":'sandbox',
    "client_id": process.env.CLIENT_ID_PAYPAL,
    "client_secret": process.env.SECRET_ID_PAYPAL,
});


const payCtrl = {
    
    getPay: (req, res) => {
        // console.log(process.env.CLIENT_ID_PAYPAL, "Secret:", process.env.SECRET_ID_PAYPAL)
        
        res.json({"msg":"Testinggg Paypal Payment",
        })
    }

    

}


module.exports = payCtrl