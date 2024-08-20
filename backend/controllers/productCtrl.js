const Products = require('../models/productModel')

const productCtrl = {
    getProducts: async (req,res) => {
        try {
            const products = await Products.find()
            res.json(products)
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    createProducts: async (req,res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body

            if(!images) return res.status(400).json({'msg':"Please upload images"})

            const product = await Products.findOne({product_id})

            if(product) return res.status(400).json({'msg':"This product is already exists"})

            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })

            await newProduct.save();
            
            res.json({'msg':"Product Uploadeddddd"})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    deleteProducts: async (req,res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({'msg':"Product Deleted....."})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    updateProducts: async (req,res) => {
        try {
            const { title, price, description, content, images, category} = req.body

            if(!images) return res.status(400).json({'msg':"Please upload image"})

             await Products.findByIdAndUpdate({_id:req.params.id},{
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
             })  

             res.json({'msg':"Product Uploadeddd"})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
}


module.exports = productCtrl