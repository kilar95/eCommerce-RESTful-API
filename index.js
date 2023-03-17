const express = require('express')
const mongoose = require('mongoose')
const productsRoute = require('./api/routes/products')
const ordersRoute = require('./api/routes/orders')
const usersRoute = require('./api/routes/users')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoSanitize = require('express-mongo-sanitize')

const app = express()
const port = process.env.PORT || 3000

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cors erros
app.use(cors({ origin: '*' }))
// sanitize inputs
app.use(mongoSanitize())

// conencting the database
dotenv.config()
mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.status(200)
        .send(`
            <h1>Welcome to my very first RESTful API</h1>
            <h2>Main Routes</h2>
            <ul>
            <li><h3>All Products:</h3> localhost:${port}/products</li>
            <li><h3>Users:</h3> localhost:${port}/users</li>
            <li><h3>Orders:</h3> localhost:${port}/orders</li>
        `)
})

// setting routes
app.use('/products', productsRoute)
app.use('/users', usersRoute)
app.use('/orders', ordersRoute)

app.all('*', (req, res, next) => {
    const error = new Error('Resource not found')
    error.status = 404
    next(error)
})

// errors handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})