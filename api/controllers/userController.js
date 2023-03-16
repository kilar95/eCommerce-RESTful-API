const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all products
const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (allUsers.length > 0) {
            res.status(200).json(allUsers)
        } else {
            res.status(200).json("No users in the database")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// create new product
const createUser = async (req, res) => {
    const newUser = new User(req.body)

    try {
        await newUser.save()
        res.status(200).json({
            message: "Product successfully created",
            cratedUser: newUser
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// get info about a specific product
const getUserDetails = async (req, res) => {
    const id = req.params.userID

    try {
        const user = await User.findById(id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json("User not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// update product
const updateUser = async (req, res) => {
    const id = req.params.userID

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json("User not found")
        } else {
            await user.updateOne({ $set: req.body })
            res.status(200).json({
                message: "User Updated",
                updatedUser: user
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// delete product 
const deleteUser = async (req, res) => {
    const id = req.params.userID

    try {
        const user = await User.findById(id)
        if (user) {
            await user.deleteOne()
            res.status(200).json("User successfully deleted")
        } else {
            res.status(404).json("User not found")
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserDetails,
    updateUser,
    deleteUser
}