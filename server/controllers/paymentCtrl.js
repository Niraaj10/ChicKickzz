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
    },


    paymentCreate: async (req, res) => {
        
        
        try {
            const { cart, TotalPriceWithGST } = req.body;

            const items = cart.map(product => {
                const price = parseFloat(product.price).toFixed(2); 
                const quantity = product.quantity;
                // console.log(`Item: ${product.title}, Price: ${price}, Quantity: ${quantity}`); 
                return {
                    "name": product.title,
                    "sku": product.product_id,
                    "price": price,
                    "currency": "USD",
                    "quantity": quantity
                };
            });

            const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0)
            // console.log(total)

            // PayPal payment object
            let create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    // "return_url": "http://localhost:3000/cart/success",
                    "return_url": `http://localhost:5000/api/payment/success?total=${total}`,
                    "cancel_url": "http://localhost:3000/cart/failed"
                    // "cancel_url": "http://localhost:5000/cart/payment/failed"
                },
                "transactions": [{
                    "item_list": {
                        "items": items
                    },
                    "amount": {
                        "currency": "USD",
                        "total": total 
                        // "total": TotalPriceWithGST 
                    },
                    "description": "Purchase from ChicKickzz"
                }]
            };

            // Create payment
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    console.log("PayPal error:", error); 
                    res.status(500).send("Payment creation failed");
                } else {
                    res.json(payment); 
                }
            });

        } catch (error) {
            console.log("Server Error:", error);
            res.status(500).send("Server Error");
        }

    
    },


    paymentSuccess: async (req, res) => {
        try {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            const total = req.query.total;
    
            
            const express_checkout_json = {
                "payer_id": payerId,
                "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": total 
                    },
                    "description": "This is the payment description."
                }]
            };
    
            paypal.payment.execute(paymentId, express_checkout_json, function (error, payment) {
                if (error) {
                    console.log(error);
                    return res.redirect("http://localhost:3000/cart/failed");
                } else {
                    // Redirect to the frontend success page with parameters
                    return res.redirect(`http://localhost:3000/cart/success/${paymentId}`);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }

    }


    

}


module.exports = payCtrl