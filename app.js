const express = require('express')
const productsRoute = require('./api/routes/products')
const ordersRoute = require('./api/routes/orders')
const usersRoute = require('./api/routes/users')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const port = process.env.PORT || 3000


const app = express()

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cors erros
app.use(cors({ origin: '*' }))
// sanitize inputs
app.use(mongoSanitize())


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

module.exports = app 