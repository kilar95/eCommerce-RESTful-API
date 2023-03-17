const express = require('express')
const router = express.Router()
const { getOrders, createOrder, getUserOrders, getOrderDetails, updateOrder, deleteOrder, filterOrders } = require('../controllers/orderController')

router.get('/', getOrders)
router.post('/:userID', createOrder)
router.get('/:userID', getUserOrders)
router.get('/details/:orderID', getOrderDetails)
router.patch('/:orderID', updateOrder)
router.delete('/:orderID', deleteOrder)
router.get('/query/filter', filterOrders)

module.exports = router