const express = require('express')
const router = express.Router()
const { getUsers, createUser, getUserDetails, updateUser, deleteUser } = require('../controllers/userController')

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:userID', getUserDetails)
router.patch('/:userID', updateUser)
router.delete('/:userID', deleteUser)

module.exports = router