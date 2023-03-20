const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../api/models/userModel')
const app = require('../app')

require('dotenv').config()
const request = supertest(app);

const dummyUser = new User({
    name: "dummy",
    surname: "user",
    email: "test@email.com"
})
let testID = null
const invalidID = "641874a665e486d5cf99313f"


// Connecting to the db before each test
beforeEach(async () => {
    await mongoose.connect(process.env.TESTING_URI)
    const response = await dummyUser.save()
    testID = response._id.toHexString()
})

// Closing the db connection after each test
afterEach(async () => {
    await mongoose.connection.close()
})

// test GET
describe("GET all users", () => {
    it("should return all the users in the db", async () => {
        const response = await request.get('/users')

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    surname: expect.any(String),
                    email: expect.any(String),
                }),
            ]))
    })
})

// test POST
describe("POST a new user", () => {

    describe("when name, surname and email are provided", () => {
        it("should return the new user", async () => {
            const testUser = ({
                name: "name",
                surname: "surname",
                email: "email"
            })

            const response = await request.post('/users').send(testUser)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                createdUser: {
                    __v: 0,
                    _id: expect.any(String),
                    name: "name",
                    surname: "surname",
                    email: "email",
                    pendingOrders: [],
                },
                message: "User successfully created"
            })
        })
    })


    describe("when either the name, surname or email are not provided", () => {
        it("should respond with a status code of 500", async () => {
            const bodyData = [
                { name: "name" },
                { surname: "surname" },
                { email: "email" },
                {}
            ]
            for (const body of bodyData) {
                const response = await request.post('/users').send(body)
                expect(response.statusCode).toBe(500)
            }
        })

    })
})


// test GET specific user
describe("GET info about a specific user", () => {

    describe("when the ID is valid", () => {
        it("should return the user with the corresponding id", async () => {
            const response = await request.get(`/users/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: testID,
                    name: expect.any(String),
                    surname: expect.any(String),
                    email: expect.any(String),
                })
            );
        })
    })

    describe("when the provided ID is not valid", () => {
        it("should return a status of 404 with an error message", async () => {
            const response = await request.get(`/users/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})

// test update user
describe("PATCH request to update user", () => {
    describe("when ID is valid", () => {
        it("should successfully update and return the user", async () => {
            const response = await request.patch(`/users/${testID}`).send({
                name: "test"
            })

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toEqual({
                message: "User Updated",
                updatedUser: expect.objectContaining({
                    _id: testID,
                    name: "test",
                    surname: "user",
                    email: "test@email.com",
                })

            })
        })
    })

    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.get(`/users/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})



// test delete user
describe("DELETE request", () => {
    describe("when the ID is invalid", () => {
        it("should return a 404 status and an error message", async () => {
            const response = await request.delete(`/users/${invalidID}`)

            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("when ID is valid", () => {
        it("should successfully delete the user", async () => {
            const response = await request.delete(`/users/${testID}`)

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

})

module.exports = dummyUser