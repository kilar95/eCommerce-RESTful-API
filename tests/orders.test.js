const supertest = require('supertest')
const mongoose = require('mongoose')
const Order = require('../api/models/orderModel')
const app = require('../app')

require('dotenv').config()
const request = supertest(app);

const dummyOrder = new Order({
    products: ["641885bb2d381dd582382fbb"],
    user: "641870e48a04aa50b5cac4b1"
})
let testID = null
const invalidID = "641874a665e486d5cf99313f"


// Connecting to the db before each test
beforeEach(async () => {
    await mongoose.connect(process.env.TESTING_URI)
    const response = await dummyOrder.save()
    testID = response._id.toHexString()
})

// Closing the db connection after each test
afterEach(async () => {
    await mongoose.connection.close()
})

// test filtering query
describe("URL query to filter orders", () => {
    describe("when the query is valid", () => {
        it("should return the orders found", async () => {
            const validQuery = {
                startDate: "2023-03-13",
                endDate: "2023-03-20",
            }

            const res = await request.get(`/orders/query/filter?startDate=${validQuery.startDate}&endDate=${validQuery.endDate}`)

            expect(res.statusCode).toBe(200)
            expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.any(Object),
                ]))
        })
    })
})

// test GET
describe("GET all orders", () => {
    it("should return all the orders in the db", async () => {
        const response = await request.get('/orders')

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    products: [expect.any(String)],
                    user: expect.any(String),
                }),
            ]))
    })
})

// test POST
describe("POST a new Order", () => {

    describe("when the products and the user are provided", () => {
        it("should return the new order", async () => {
            const testOrder = ({
                products: ["641885efb9ed3e26b1a0f218"],
            })

            const response = await request.post(`/orders/641870e48a04aa50b5cac4b1`).send(testOrder)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                createdOrder: expect.any(Object),
                message: expect.any(String)
            })
        })
    })
})


// test GET specific order
describe("GET info about a specific Order", () => {

    describe("when the ID is valid", () => {
        it("should return the Order with the corresponding id", async () => {
            const response = await request.get(`/orders/details/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: testID,
                    products: expect.arrayContaining([
                        expect.any(Object)
                    ]),
                    user: expect.any(Object),
                })
            )
        })
    })

    describe("when the provided ID is not valid", () => {
        it("should return a status of 404 with an error message", async () => {
            const response = await request.get(`/orders/details/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})

// test update order
describe("PATCH request to update order", () => {
    describe("when ID is valid", () => {
        it("should successfully update and return the order", async () => {
            const response = await request.patch(`/orders/${testID}`).send({
                quantity: [3]
            })

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                message: "Order Updated",
                updatedOrder: expect.objectContaining({
                    _id: testID,
                    products: expect.arrayContaining([
                        expect.any(String)
                    ]),
                    user: expect.any(String),
                    quantity: [3]
                })

            })
        })
    })

    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.get(`/orders/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})



// test delete user
describe("DELETE request", () => {
    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.delete(`/orders/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("when ID is valid", () => {
        it("should successfully delete the user", async () => {
            const response = await request.delete(`/orders/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

})


