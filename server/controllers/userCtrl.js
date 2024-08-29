const Users = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userCtrl = {

    signup: async (req,res) => {
        // res.json({"msg":"Testinggg Controllerss"})
        try {
            const {name,email,password} = req.body;

            const user = await Users.findOne({email});

            if(user) return res.status(400).json({"msg": "Email is already registered please try again with different email"});

            if(password.length < 6) return res.status(400).json({"msg":"Password is at least 6 characters"});

            //Password encryption
            const encryptedPass = await bcrypt.hash(password,10);

            const newUser = new Users({
                name,
                email, 
                password : encryptedPass
            });

            //pushing new user to mongoDb database
            await newUser.save();

            //jwt authentication
            // const accesstoken = createToken({id:newUser._id});
            // const refreshtoken = createRefToken({id:newUser._id});

            // //cookieee
            // res.cookie('refToken', refreshtoken, {
            //     httpOnly:true,
            //     path:'/user/refToken'
            //     // path:'/user/ref_token'
            // });

            res.json({"msg":"Signup successfullll!",  userId: user._id});
            // res.json({accesstoken});
            
        } catch (error) {
            return res.status(500).json({"msg":error.message})
        }
    },

    // refToken: async (req,res) => {
    //     try {
    //         const rf_token = req.cookies.refToken;
    
    //         if(!rf_token) return res.status(400).json({"msg":"Please Login or Signuppp"});
    //         // if(!rf_token) return res.status(300).json({"msg":"Please Login or Signuppp"});
    
    //         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
    //             if(err) return res.status(400).json({"msg":"Please Login or Signup"});
    //             const accesstoken = createToken({id:user.id})
    //             res.json({user,accesstoken});  
    //         })
    //         // res.json({rf_token});
    //     } catch (error) {
    //         return res.status(500).json({'msg':error.message})
    //     }
    // },



    login: async (req,res) => {
        try {
            const {email, password} = req.body

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({'msg':"User not found, Please Signup"})
                
            const matchedUser = await bcrypt.compare(password,user.password)
            if(!matchedUser) return res.status(400).json({'msg':"Incorrect Password"})
            
            //jwt authentication
            // const accesstoken = createToken({id:user._id});
            // const refreshtoken = createRefToken({id:user._id});

            // //cookieee
            // res.cookie('refToken', refreshtoken, {
            //     httpOnly:true,
            //     path:'/user/refToken'
            //     // path:'/user/ref_token'
            // });    
                
            res.json({'msg':"Login Success", userId: user._id})
            // res.json({accesstoken})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },

    logout: async (req,res) => {
        try {
            // res.clearCookie(
            //     'refToken',
            //     {path:'/user/refToken'}
            // )
            // return res.json({'msg':"Logout Successfull"})

            res.json({'msg':"Logout Successfull"})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },

    getUser: async (req,res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password');
            if (!user) return res.status(400).json({ "msg": "User not found" });

            res.json(user);
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
}


module.exports = userCtrl