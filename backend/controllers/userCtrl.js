const Users = require('../models/userModel')

const userCtrl = {
    signup: async (req,res) => {
        // res.json({"msg":"Testinggg Controllerss"})
        try {
            const {name,email,password} = req.body;

            const user = await Users.findOne({email});

            if(user) return res.status(400).json({"msg": "Email is already registered please try again with different email"});

            if(password.length < 6) return res.status(400).json({"msg":"Password is at least 6 characters"});

            const newUser = new Users({
                name, email, password
            });

            //pushing new user to mongoDb database
            await newUser.save();

            res.json({"msg":"Signup successfullll!"});
            
        } catch (error) {
            return res.status(500).json({"msg":error.message})
        }
    }
}

module.exports = userCtrl