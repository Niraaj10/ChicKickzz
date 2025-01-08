const paypal = require('paypal-rest-sdk');
require('dotenv').config();


paypal.configure({
    "mode": 'sandbox',
    "client_id": process.env.CLIENT_ID_PAYPAL,
    "client_secret": process.env.SECRET_ID_PAYPAL,
});


const payCtrl = {

    getPay: (req, res) => {
        // console.log(process.env.CLIENT_ID_PAYPAL, "Secret:", process.env.SECRET_ID_PAYPAL)

        res.json({
            "msg": "Testinggg Paypal Payment",
        })
    },


    paymentCreate: async (req, res) => {


        try {
            const { cart, TotalPriceWithGST } = req.body;

            // Validate the cart
            if (!Array.isArray(cart) || cart.length === 0) {
                return res.status(400).send({ error: "Cart is empty or invalid." });
            }

            // Calculate subtotal
            const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

            // Validate TotalPriceWithGST
            const calculatedTotal = parseFloat((subtotal * 1.12).toFixed(2));
            if (Math.abs(calculatedTotal - TotalPriceWithGST) > 0.01) {
                return res.status(400).send({
                    error: "TotalPriceWithGST does not match calculated value.",
                    calculatedTotal,
                    providedTotal: TotalPriceWithGST,
                });
            }

            const items = cart.map(product => {
                const price = parseFloat(product.price).toFixed(2); 
                const quantity = product.quantity;
                return {
                    name: product.title,
                    sku: product.product_id,
                    price,
                    currency: "USD",
                    quantity,
                };
            });

            // Total and subtotal need to be consistent
            const create_payment_json = {
                intent: "sale",
                payer: { payment_method: "paypal" },
                redirect_urls: {
                    // return_url: `http://localhost:5000/api/payment/success?total=${TotalPriceWithGST}`,
                    // cancel_url: "http://localhost:3000/cart/failed",
                    return_url: `https://chickickzz-1.onrender.com/api/payment/success?total=${TotalPriceWithGST}`,
                    cancel_url: "https://chickickzz10.netlify.app/cart/failed",
                },
                transactions: [
                    {
                        item_list: { items },
                        amount: {
                            currency: "USD",
                            total: parseFloat(TotalPriceWithGST).toFixed(2), // Total includes GST
                            details: {
                                subtotal: parseFloat(subtotal).toFixed(2), // Subtotal is sum of item prices
                                tax: (calculatedTotal - subtotal).toFixed(2), // Tax GST
                            },
                        },
                        description: "Purchase from ChicKickzz",
                    },
                ],
            };

            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    console.error("PayPal error:", error);
                    res.status(500).send({ error: "Payment creation failed", details: error });
                } else {
                    res.json(payment);
                }
            });
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).send({ error: "Server Error", details: error.message });
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
                    // return res.redirect("http://localhost:3000/cart/failed");
                    return res.redirect("https://chickickzz10.netlify.app/cart/failed");
                } else {
                    // Redirect to the frontend success page with parameters
                    // return res.redirect(`http://localhost:3000/cart/success/${paymentId}`);
                    return res.redirect(`https://chickickzz10.netlify.app/cart/success/${paymentId}`);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }

    }




}


module.exports = payCtrl