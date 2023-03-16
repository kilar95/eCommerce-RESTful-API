const express = require('express')
const router = express.Router()
const { getProducts, createProduct, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getProducts)
router.post('/', createProduct)
router.get('/:productID', getProductDetails)
router.patch('/:productID', updateProduct)
router.delete('/:productID', deleteProduct)

module.exports = router