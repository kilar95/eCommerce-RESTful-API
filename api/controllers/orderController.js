const Order = require('../models/orderModel')
const mongoose = require('mongoose')


// get all orders
const getOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        if (allOrders.length > 0) {
            res.status(200).json(allOrders)
        } else {
            res.status(200).json("No orders in the database")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// create new order
const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        await newOrder.save()
        res.status(200).json({
            message: "Order successfully created",
            createdOrder: newOrder
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// get info about a specific order
const getOrderDetails = async (req, res) => {
    const id = req.params.orderID

    try {
        const order = Order.findById(id)
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404).json("Order not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}


// update order
const updateOrder = async (req, res) => {
    const id = req.params.orderID

    try {
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json("Order not found")
        } else {
            await order.updateOne({ $set: req.body })
            res.status(200).json({
                message: "Order Updated",
                updatedOrder: order
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}


// delete order 
const deleteOrder = async (req, res) => {
    const id = req.params.orderID

    try {
        const order = await Order.findById(id)
        if (order) {
            await order.deleteOne()
            res.status(200).json("Order successfully deleted")
        } else {
            res.status(404).json("Order not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}


module.exports = {
    getOrders,
    createOrder,
    getOrderDetails,
    updateOrder,
    deleteOrder,
}