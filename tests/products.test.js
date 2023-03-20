const supertest = require('supertest')
const mongoose = require('mongoose')
const Product = require('../api/models/productModel')
const app = require('../app')

require('dotenv').config()
const request = supertest(app);

const dummyProduct = new Product({
    name: "dummy",
    price: 1.99,
    inStock: true
})
let testID = null
const invalidID = "641874a665e486d5cf99313f"


// Connecting to the db before each test
beforeEach(async () => {
    await mongoose.connect(process.env.TESTING_URI)
    const response = await dummyProduct.save()
    testID = response._id.toHexString()
})

// Closing the db connection after each test
afterEach(async () => {
    await mongoose.connection.close()
})

// test GET
describe("GET all products", () => {
    it("should return all the products in the db", async () => {
        const response = await request.get('/products')

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    price: expect.any(Number),
                    inStock: expect.any(Boolean),
                }),
            ]))
    })
})

// test POST
describe("POST a new product", () => {

    describe("when name is provided", () => {
        it("should return the new product", async () => {
            const testProduct = ({
                name: "name",
                price: 2.99,
                inStock: true
            })

            const response = await request.post('/products').send(testProduct)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                createdProduct: {
                    __v: 0,
                    _id: expect.any(String),
                    name: "name",
                    price: 2.99,
                    inStock: true,
                },
                message: "Product successfully created"
            })
        })
    })


    describe("when the name is not provided", () => {
        it("should respond with a status code of 500", async () => {
            const bodyData = [
                { price: 3.99 },
                { inStock: true },
                {}
            ]
            for (const body of bodyData) {
                const response = await request.post('/products').send(body)
                expect(response.statusCode).toBe(500)
            }
        })

    })
})


// test GET specific product
describe("GET info about a specific product", () => {

    describe("when the ID is valid", () => {
        it("should return the product with the corresponding id", async () => {
            const response = await request.get(`/products/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: testID,
                    name: expect.any(String),
                    price: expect.any(Number),
                    inStock: expect.any(Boolean),
                })
            );
        })
    })

    describe("when the provided ID is not valid", () => {
        it("should return a status of 404 with an error message", async () => {
            const response = await request.get(`/products/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})

// test update product
describe("PATCH request to update product", () => {
    describe("when ID is valid", () => {
        it("should successfully update and return the product", async () => {
            const response = await request.patch(`/products/${testID}`).send({
                name: "test"
            })

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                message: "Product Updated",
                updatedProduct: expect.objectContaining({
                    _id: testID,
                    name: "test",
                    price: 1.99,
                    inStock: true,
                })

            })
        })
    })

    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.get(`/products/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})



// test delete product
describe("DELETE request", () => {
    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.delete(`/products/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("when ID is valid", () => {
        it("should successfully delete the user", async () => {
            const response = await request.delete(`/products/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

})

module.exports = dummyProduct