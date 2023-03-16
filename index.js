const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const productsRoute = require('./api/routes/products')
const ordersRoute = require('./api/routes/orders')
const usersRoute = require('./api/routes/users')
const cors = require('cors')
const dotenv = require('dotenv')


// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// cors erros
app.use(cors({ origin: '*' }))


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
            <h1>Welcome to my RESTful API</h1>
            <h2>Routes</h2>
            <ul>
            <li><a href="localhost:${port}/products"> All Products </a></li>
            <li><a href="localhost:${port}/orders"> Orders </a></li>
            <li><a href="localhost:${port}/users"> Users </a></li>
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