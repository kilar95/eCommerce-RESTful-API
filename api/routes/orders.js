const express = require('express')
const router = express.Router()
const { getOrders, createOrder, getOrderDetails, updateOrder, deleteOrder } = require('../controllers/orderController')

router.get('/', getOrders)
router.post('/', createOrder)
router.get('/:orderID', getOrderDetails)
router.patch('/:orderID', updateOrder)
router.delete('/:orderID', deleteOrder)

module.exports = router