const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all products
const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        if (allProducts.length > 0) {
            res.status(200).json(allProducts)
        } else {
            res.status(200).json("No products in the database")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// create new product
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        await newProduct.save()
        res.status(200).json({
            message: "Product successfully created",
            createdProduct: newProduct
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// get info about a specific product
const getProductDetails = async (req, res) => {
    const id = req.params.productID

    try {
        const product = await Product.findById(id)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json("Product not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// update product
const updateProduct = async (req, res) => {
    const id = req.params.productID

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json("Product not found")
        } else {
            await product.updateOne({ $set: req.body })
            res.status(200).json({
                message: "Product Updated",
                updatedProduct: product
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// delete product 
const deleteProduct = async (req, res) => {
    const id = req.params.productID

    try {
        const product = await Product.findById(id)
        if (product) {
            await product.deleteOne()
            res.status(200).json("Product successfully deleted")
        } else {
            res.status(404).json("Product not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct
}