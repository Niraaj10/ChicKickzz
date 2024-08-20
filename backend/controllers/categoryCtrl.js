const category = require("../models/categoryModel")

const categoryCtrl = {
    getCategories : async (req,res) => {
        try {
            const categories = await category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    createCategory : async (req,res) => {
        try {
            const {name} = req.body
            const categoryy = await category.findOne({name})

            if(categoryy) return res.status(400).json({'msg':"Category Already Exits"})

            const newCat = new category({name}) 

            await newCat.save()
                
            res.json('Category Createddd!')
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    deleteCategory : async (req,res) => {
        try {
            // res.json(req.params)

            const deletedCategory = await category.findByIdAndDelete(req.params.id)
            if (!deletedCategory) {
                return res.status(404).json({ msg: "Category not found" });
            }
            
            res.json({'msg':"Deleted a category"})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
    
    updateCategory : async (req,res) => {
        try {
            const {name} = req.body;
            const upDCategory = await category.findByIdAndUpdate({_id:req.params.id}, {name})
            if (!upDCategory) {
                return res.status(404).json({ msg: "Category not found" });
            }

            res.json({'msg':"Category is Updated"})
        } catch (error) {
            return res.status(500).json({'msg':error.message})
        }
    },
}

module.exports = categoryCtrl