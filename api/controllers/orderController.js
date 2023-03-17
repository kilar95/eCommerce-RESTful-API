const Order = require('../models/orderModel')
const mongoose = require('mongoose')
const Product = require('../models/productModel')
const User = require('../models/userModel')

// get all orders
const getOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().sort({ updatedAt: -1 })
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
    const userID = req.params.userID

    try {
        // check if the userID provided in the URI is correct
        const user = await User.findById(userID)
        if (!user) {
            return res.status(404).json("The account you are trying to access does not exist")
        } else {
            // check if there are any invalid IDs in the products array
            const productsIDs = req.body.products
            const invalidIDs = []
            for (let id in productsIDs) {
                const product = await Product.findById(productsIDs[id])
                if (!product) invalidIDs.push(id)
            }
            if (invalidIDs.length >= 1) {
                return res.status(404).json(`Product with id ${invalidIDs[0]} does not exist. Please try again.`)
            } else {
                const newOrder = new Order({
                    products: req.body.products,
                    quantity: req.body.quantity,
                    user: userID
                })

                await newOrder.save()
                await user.updateOne({ $push: { pendingOrders: newOrder._id } })
                res.status(200).json({
                    message: "Order successfully created",
                    createdOrder: newOrder
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// get all orders from a user
const getUserOrders = async (req, res) => {
    const userID = req.params.userID

    try {
        const user = await User.findById(userID)
        if (!user) {
            res.status(404).json("User does not exist.")
        } else {
            const orders = await Order.find({ 'user': userID }).populate('products', 'name').populate('user', 'surname email').sort({ updatedAt: -1 })
            if (orders.length >= 1) {
                res.status(200).json(orders)
            } else {
                res.status(200).json("This user has 0 orders pending.")
            }
        }
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
        const order = await Order.findById(id).populate('products', 'name').populate('user', 'surname email')
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
        const orderUpdated = await Order.findByIdAndUpdate({ _id: id }, { $set: req.body }, { returnDocument: 'after' })
        if (orderUpdated) {
            res.status(200).json({
                message: "Order Updated",
                updatedOrder: orderUpdated
            })
        } else {
            res.status(404).json("Order not found")
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

// filter orders
const filterOrders = async (req, res) => {
    const { startDate, endDate, productID } = req.query;

    const query = {};

    if (startDate) {
        query.createdAt = {
            $gte: new Date(startDate)
        }
    }

    if (endDate) {
        const endDateWithTime = new Date(endDate + 'T23:59:59.999Z')
        query.createdAt = {
            ...query.createdAt,
            $lte: endDateWithTime
        }
    }

    if (productID) {
        query.products = {
            $in: [productID]
        }
    }

    try {
        const orders = await Order.find(query).populate('products', 'name').populate('user', 'surname email')
        if (orders.length < 1) {
            return res.status(200).json("No order matched your query")
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}


module.exports = {
    getOrders,
    createOrder,
    getUserOrders,
    getOrderDetails,
    updateOrder,
    deleteOrder,
    filterOrders
}