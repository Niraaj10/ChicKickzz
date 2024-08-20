// const { query } = require('express');
const Products = require('../models/productModel')


class APIfeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }

    filtering(){
        const queryObj = {...this.queryString}
        // console.log(queryObj)
        const cuttFields = ['page','sort','limit']
        cuttFields.forEach(fld => delete(queryObj[fld]))
        // console.log(queryObj)

        let queryStr = JSON.stringify(queryObj)
        //filtering Regex
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        // console.log({queryObj,queryStr})

        this.query.find(JSON.parse(queryStr))

        return this
    }

    sorting(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')
            // console.log(sortBy)

            this.query = this.query.sort(sortBy)

        } else {
            this.query = this.query.sort('-createAT')
        }

        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;
        // limit of products on one page
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this
    }
}

const productCtrl = {
    getProducts: async (req,res) => {
        try {
            console.log(req.query);
            const features = new APIfeatures(Products.find(),req.query).filtering().sorting().pagination()          
            // const products = await Products.find()
            const products = await features.query

            // res.json(products)
            res.json({result: products.length})
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